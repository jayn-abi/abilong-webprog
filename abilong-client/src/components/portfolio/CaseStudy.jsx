import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Chip, Eyebrow } from './Section';
import Reveal from './Reveal';
import ProjectVisual from './ProjectVisual';
import FeaturedVisual from './FeaturedVisual';
import ProjectLogo from './ProjectLogo';
import { GenericMockup, mockups } from './Mockups';
import { GithubIcon } from './icons';
import { useMedia } from '../../context/MediaContext';

export const ProjectLinks = ({ github, demo, name }) => {
  if (!github && !demo) return null;
  const cls = 'inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--text) transition-colors hover:text-(--accent)';
  return (
    <div className="flex flex-wrap gap-x-5">
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${name} on GitHub`}>
          <GithubIcon /> GitHub
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${name} live demo`}>
          Live demo <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
};

const PreviewTag = ({ slots }) => {
  const { media } = useMedia();
  if (slots.some((s) => media[s]?.url)) return null;
  return (
    <span className="absolute left-3 top-3 z-10 rounded-full border border-(--border) bg-(--card)/90 px-2.5 py-1 text-[10px] font-medium text-(--subtle) backdrop-blur">
      Interface preview
    </span>
  );
};

/*
 * Full case study for any project: web + mobile visual, summary, facts,
 * technologies, links, and responsibilities. Empty fields are skipped.
 */
export const CaseStudy = ({ project: p, eyebrow, headingLevel = 'h3' }) => {
  const Heading = headingLevel;
  const facts = [
    ['Project', p.name],
    ['Role', p.role],
    ['Technology', p.technologySummary],
    ['Focus', p.focus],
    ['Key contribution', p.contribution],
  ].filter(([, v]) => v);

  return (
    <Reveal as="article" id={`project-${p.id}`} className="group overflow-hidden rounded-3xl border border-(--border) bg-(--card) shadow-(--shadow-card)">
      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        <div className="relative overflow-hidden border-b border-(--border) bg-(--elevated)/60 p-6 sm:p-10 lg:flex lg:items-center lg:border-b-0 lg:border-r">
          <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <PreviewTag slots={[p.media.web, p.media.mobile]} />
          <div className="relative mx-auto w-full max-w-xl">
            <FeaturedVisual project={p} />
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <ProjectLogo project={p} />
            <Eyebrow>{eyebrow ?? p.tagline}</Eyebrow>
          </div>
          <Heading className="mt-5 text-3xl font-bold text-(--text)">{p.name}</Heading>
          {p.context && <p className="mt-1 text-sm text-(--subtle)">{p.context}</p>}
          {p.subtitle && <p className="mt-2 text-base font-medium leading-6 text-(--text)/80">{p.subtitle}</p>}
          {p.description && <p className="mt-4 text-sm leading-6 text-(--muted)">{p.description}</p>}

          {facts.length > 0 && (
            <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-(--border) bg-(--border) text-sm">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 bg-(--card) px-4 py-3">
                  <dt className="text-(--subtle)">{k}</dt>
                  <dd className="font-medium text-(--text)">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {p.tech.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {p.tech.map((t) => <li key={t}><Chip>{t}</Chip></li>)}
            </ul>
          )}

          <div className="mt-auto pt-6">
            <ProjectLinks github={p.github} demo={p.demo} name={p.name} />
          </div>
        </div>
      </div>

      {p.responsibilities.length > 0 && (
        <div className="border-t border-(--border) p-6 sm:p-10">
          <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-(--subtle)">My responsibilities</h4>
          <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.responsibilities.map((r, i) => (
              <li key={`${r.title}-${i}`} className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-(--accent)" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-(--text)">{r.title}</p>
                  {r.body && <p className="mt-1 text-sm leading-6 text-(--muted)">{r.body}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Reveal>
  );
};

/* Compact card linking to the project's own case-study page. */
export const ProjectCard = ({ project, delay = 0 }) => {
  const Mockup = mockups[project.mockup];
  const to = `/projects/${project.id}`;
  return (
    <Reveal as="article" delay={delay} className="group card-lift relative flex flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--card) shadow-(--shadow-card)">
      <Link to={to} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden border-b border-(--border) bg-(--elevated)/60 p-5">
        <PreviewTag slots={[project.media.web]} />
        <div className="aspect-[16/10]">
          <ProjectVisual slot={project.media.web} alt={`${project.name} interface`} fallback={Mockup ? <Mockup /> : <GenericMockup name={project.name} />} width={900} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <ProjectLogo project={project} size="sm" />
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-(--accent)">{project.tagline}</p>
        </div>
        <h3 className="mt-3 text-xl font-bold text-(--text)">
          <Link to={to} className="transition-colors hover:text-(--accent)">{project.name}</Link>
        </h3>
        {project.description && <p className="mt-3 text-sm leading-6 text-(--muted)">{project.description}</p>}

        {project.role && (
          <p className="mt-4 text-sm"><span className="text-(--subtle)">My role · </span><span className="font-medium text-(--text)">{project.role}</span></p>
        )}

        {project.tech.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tech.slice(0, 6).map((t) => <li key={t}><Chip>{t}</Chip></li>)}
            {project.tech.length > 6 && <li><Chip>+{project.tech.length - 6}</Chip></li>}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-5">
          <Link to={to} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--accent) transition-colors hover:text-(--text)">
            View case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <ProjectLinks github={project.github} demo={project.demo} name={project.name} />
        </div>
      </div>
    </Reveal>
  );
};
