import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import Button from '../Button';
import Reveal from '../portfolio/Reveal';
import FeaturedVisual from '../portfolio/FeaturedVisual';
import { GithubIcon, LinkedinIcon } from '../portfolio/icons';
import { usePortfolio } from '../../context/PortfolioContext';

const buildFacts = (education, featuredProject) => [
  education[0] && { label: 'Studying', value: education[0].degree, sub: `${education[0].school} · ${education[0].period}` },
  { label: 'Direction', value: 'Technology Project Management', sub: 'Agile / Scrum · QA & Testing' },
  { label: 'Builds with', value: 'Flutter · React · Node.js', sub: 'Express · MongoDB · REST APIs' },
  featuredProject && { label: 'Featured work', value: featuredProject.name, sub: featuredProject.tagline },
].filter(Boolean);

const Hero = () => {
  const { profile, links, featuredProject, education } = usePortfolio();
  const facts = buildFacts(education, featuredProject);
  const [firstNames, lastName] = [profile.name.split(' ').slice(0, -1).join(' '), profile.name.split(' ').slice(-1)[0]];
  return (
  <section id="home" className="hero-mesh relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8 lg:pb-20">
    <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />

    <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
      <Reveal>
        <p className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--card) px-3 py-1 text-xs font-medium text-(--muted)">
          <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" aria-hidden="true" />
          {profile.availability} · {profile.location}
        </p>

        <h1 className="mt-6 text-4xl font-bold uppercase leading-[1.02] tracking-tight text-(--text) sm:text-5xl lg:text-6xl">
          {firstNames} <span className="gradient-text">{lastName}</span>
        </h1>

        <p className="mt-5 text-lg font-semibold text-(--text) sm:text-xl">{profile.title}</p>
        <p className="mt-3 max-w-xl text-base leading-7 text-(--muted) sm:text-lg sm:leading-8">{profile.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
          {profile.focus.map((f) => (
            <li key={f} className="rounded-md border border-(--border) bg-(--card) px-2.5 py-1 font-mono text-xs text-(--muted)">{f}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/projects">
            View Projects <ArrowRight className="h-4 w-4" />
          </Button>
          {links.cv
            ? <Button href={links.cv} variant="secondary"><FileText className="h-4 w-4" /> View CV</Button>
            : <Button to="/contact#credentials" variant="secondary"><FileText className="h-4 w-4" /> View CV</Button>}
        </div>

        <div className="mt-6 flex items-center gap-5 text-sm">
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-medium text-(--muted) transition-colors hover:text-(--accent)">
              <LinkedinIcon /> LinkedIn
            </a>
          )}
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-medium text-(--muted) transition-colors hover:text-(--accent)">
              <GithubIcon /> GitHub
            </a>
          )}
        </div>
      </Reveal>

      {/* The work is the visual: featured project web + mobile */}
      {featuredProject && <Reveal delay={120}>
        <Link to={`/projects/${featuredProject.id}`} className="group block" aria-label={`View the ${featuredProject.name} case study`}>
          <FeaturedVisual project={featuredProject} width={1200} />
          <p className="mt-10 flex items-center gap-2 text-sm text-(--muted)">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-(--accent)">Featured</span>
            <span className="font-semibold text-(--text)">{featuredProject.name}</span>
            {featuredProject.tagline && <span className="hidden sm:inline">· {featuredProject.tagline}</span>}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </p>
        </Link>
      </Reveal>}
    </div>

    {/* 30-second summary for recruiters */}
    <Reveal delay={200} className="relative mx-auto mt-16 max-w-6xl">
      <dl className="grid overflow-hidden rounded-2xl border border-(--border) bg-(--border) sm:grid-cols-2 lg:grid-cols-4 gap-px">
        {facts.map((f) => (
          <div key={f.label} className="bg-(--card) p-5">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-(--subtle)">{f.label}</dt>
            <dd className="mt-2 text-sm font-semibold text-(--text)">{f.value}</dd>
            <dd className="mt-1 text-sm text-(--muted)">{f.sub}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  </section>
  );
};

export default Hero;
