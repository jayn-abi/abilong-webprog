import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchPortfolio, updatePortfolio } from '../services/PortfolioService';
import { defaultPortfolio } from '../data/portfolio';
import { combineProjects } from '../data/projects';

const CACHE_KEY = 'portfolio_content_v1';

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

// Only allow web, mail, and same-site links in hrefs coming from the database
export const safeHref = (url) => {
  const value = typeof url === 'string' ? url.trim() : '';
  return /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(value) ? value : '';
};

const sanitizeItem = (item, keys) => {
  if (!isPlainObject(item)) return item;
  const next = { ...item };
  keys.forEach((k) => { if (k in next) next[k] = safeHref(next[k]); });
  return next;
};

/*
 * Saved sections override the built-in defaults section by section; object
 * sections are merged so a newly added default field still has a value.
 */
const mergeContent = (remote) => {
  const merged = {};
  for (const [key, fallback] of Object.entries(defaultPortfolio)) {
    const value = remote?.[key];
    if (value === undefined || value === null) merged[key] = fallback;
    else if (isPlainObject(fallback)) merged[key] = isPlainObject(value) ? { ...fallback, ...value } : fallback;
    else merged[key] = Array.isArray(value) ? value : fallback;
  }
  // Email is a plain address (it becomes mailto: when rendered), not a URL
  const email = typeof merged.links.email === 'string' ? merged.links.email.trim() : '';
  merged.links = {
    ...sanitizeItem(merged.links, Object.keys(merged.links).filter((k) => k !== 'email')),
    email: /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(email) ? email : '',
  };
  merged.projects = combineProjects(remote?.projects, remote?.featuredProject, defaultPortfolio.projects)
    .map((p) => sanitizeItem(p, ['github', 'demo']));
  merged.featuredProject = merged.projects.find((p) => p.featured) ?? null;
  merged.certifications = merged.certifications.map((c) => sanitizeItem(c, ['link']));
  return merged;
};

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (value) => {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(value)); } catch { /* storage unavailable */ }
};

export const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  // Last-seen content paints immediately; the API response replaces it.
  const [remote, setRemote] = useState(readCache);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPortfolio()
      .then(({ data }) => {
        if (!active) return;
        setRemote(data.portfolio ?? null);
        writeCache(data.portfolio ?? null);
      })
      .catch(() => {})
      .finally(() => active && setLoaded(true));
    return () => { active = false; };
  }, []);

  // `content` has everything (for the dashboard); `publicContent` leaves out archived projects
  const content = useMemo(() => mergeContent(remote), [remote]);
  const publicContent = useMemo(() => {
    const projects = content.projects.filter((p) => !p.archived);
    return { ...content, projects, featuredProject: projects.find((p) => p.featured) ?? null };
  }, [content]);

  const saveSections = useCallback(async (sections) => {
    const { data } = await updatePortfolio(sections);
    setRemote(data.portfolio);
    writeCache(data.portfolio);
    return data.portfolio;
  }, []);

  return (
    <PortfolioContext.Provider value={{ content, publicContent, loaded, saveSections }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext).publicContent;
export const usePortfolioAdmin = () => useContext(PortfolioContext);
