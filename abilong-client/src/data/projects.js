/*
 * Project helpers shared by the public site and the dashboard.
 *
 * Every project has the same shape (so any of them can be featured or get a
 * full case study). Older saved content stored the featured project in a
 * separate `featuredProject` section and used a single image slot per
 * project; `combineProjects` converts that into the current shape.
 */
export const blankProject = {
  id: '',
  name: '',
  tagline: '',
  subtitle: '',
  context: '',
  description: '',
  role: '',
  technologySummary: '',
  focus: '',
  contribution: '',
  tech: [],
  responsibilities: [],
  github: '',
  demo: '',
  featured: false,
  archived: false,
  mockup: '',
  media: {},
};

const slotBase = (p) => (p.id || 'project').toLowerCase().replace(/[^a-z0-9-]+/g, '-').slice(0, 30);

export const normalizeProject = (p) => {
  const media = typeof p.media === 'string' ? { web: p.media } : (p.media ?? {});
  const base = slotBase(p);
  return {
    ...blankProject,
    ...p,
    tech: Array.isArray(p.tech) ? p.tech : [],
    responsibilities: Array.isArray(p.responsibilities) ? p.responsibilities : [],
    media: {
      web: media.web || `${base}-web`,
      mobile: media.mobile || `${base}-mobile`,
      logo: media.logo || `${base}-logo`,
    },
  };
};

// Exactly one project is featured: the first visible one flagged, else the
// first visible project (archived projects are hidden from the site).
const ensureOneFeatured = (list) => {
  const flagged = list.findIndex((p) => p.featured && !p.archived);
  const index = Math.max(0, flagged !== -1 ? flagged : list.findIndex((p) => !p.archived));
  return list.map((p, i) => ({ ...p, featured: i === index }));
};

/**
 * @param saved       projects array from the database (or undefined)
 * @param legacy      old `featuredProject` section from the database (or undefined)
 * @param defaults    built-in default projects
 */
export const combineProjects = (saved, legacy, defaults) => {
  let list = Array.isArray(saved) ? saved : defaults;
  if (legacy?.id && !legacy.retired) {
    const old = { ...legacy, featured: true };
    const at = list.findIndex((p) => p.id === legacy.id);
    list = at >= 0 ? list.map((p, i) => (i === at ? { ...p, ...old } : p)) : [old, ...list];
  }
  return list.length ? ensureOneFeatured(list.map(normalizeProject)) : [];
};

export const allSlots = (project) => Object.values(project.media ?? {}).filter(Boolean);
