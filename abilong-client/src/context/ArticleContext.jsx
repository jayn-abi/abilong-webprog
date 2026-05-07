import { createContext, useCallback, useContext, useEffect, useState } from 'react';
const STORAGE_KEY = 'abilong_articles_v2';

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
};

const persist = (list) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
};

export const ArticleContext = createContext(null);

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState(load);

  const addArticle = useCallback((data) => {
    const article = { ...data, _id: `local-${Date.now()}` };
    setArticles((prev) => { const next = [...prev, article]; persist(next); return next; });
  }, []);

  const editArticle = useCallback((id, data) => {
    setArticles((prev) => {
      const next = prev.map((a) => (a._id === id ? { ...a, ...data } : a));
      persist(next);
      return next;
    });
  }, []);

  const deleteArticle = useCallback((id) => {
    setArticles((prev) => {
      const next = prev.filter((a) => a._id !== id);
      persist(next);
      return next;
    });
  }, []);

  // Sync state when another tab makes changes via localStorage
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        try { setArticles(e.newValue ? JSON.parse(e.newValue) : []); } catch {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <ArticleContext.Provider value={{ articles, addArticle, editArticle, deleteArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => useContext(ArticleContext);
