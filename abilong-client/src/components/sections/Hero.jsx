import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import Button from '../Button';
import Reveal from '../portfolio/Reveal';
import FeaturedVisual from '../portfolio/FeaturedVisual';
import { GithubIcon, LinkedinIcon } from '../portfolio/icons';
import { usePortfolio } from '../../context/PortfolioContext';
import { useLinks } from '../../data/documents';

const buildFacts = (education, featuredProject) => [
  education[0] && { label: 'Studying', value: education[0].degree, sub: `${education[0].school} · ${education[0].period}` },
  { label: 'Direction', value: 'Technology Project Management', sub: 'Agile / Scrum · QA & Testing' },
  { label: 'Builds with', value: 'Flutter · React · Node.js', sub: 'Express · MongoDB · REST APIs' },
  featuredProject && { label: 'Featured work', value: featuredProject.name, sub: featuredProject.tagline },
].filter(Boolean);

const Hero = () => {
  const { profile, featuredProject, education } = usePortfolio();
  const links = useLinks();
  const facts = buildFacts(education, featuredProject);
  const [firstNames, lastName] = [profile.name.split(' ').slice(0, -1).join(' '), profile.name.split(' ').slice(-1)[0]];
  return (
  <section id="home" className="hero-mesh relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-8 lg:pb-20">
    <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
    <div aria-hidden="true">
      <span className="aurora -left-24 top-10 h-72 w-72 bg-[#00d4ff]" />
      <span className="aurora -right-24 top-0 h-80 w-80 bg-[#a855f7]" style={{ animationDelay: '-6s' }} />
      <span className="aurora -bottom-24 left-1/3 h-72 w-72 bg-[#22d3a5]" style={{ animationDelay: '-12s', opacity: 0.22 }} />
    </div>

    <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
      <div>
        <p className="hero-rise inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--card) px-3 py-1 text-xs font-medium text-(--muted)">
          <span className="ping-dot h-1.5 w-1.5 rounded-full bg-(--accent)" aria-hidden="true" />
          {profile.availability} · {profile.location}
        </p>

        <h1 className="mt-6 text-4xl font-bold uppercase leading-[1.02] tracking-tight text-(--text) sm:text-5xl lg:text-6xl" aria-label={profile.name}>
          {firstNames.split(' ').filter(Boolean).map((word, i) => (
            <span key={`${word}-${i}`} aria-hidden="true">
              <span className="mask-word"><span style={{ '--d': `${120 + i * 110}ms` }}>{word}</span></span>{' '}
            </span>
          ))}
          <span className="mask-word" aria-hidden="true">
            <span className="gradient-text gradient-flow" style={{ '--d': `${120 + firstNames.split(' ').filter(Boolean).length * 110}ms` }}>{lastName}</span>
          </span>
        </h1>

        <p className="hero-rise mt-5 text-lg font-semibold text-(--text) sm:text-xl" style={{ '--d': '450ms' }}>{profile.title}</p>
        <p className="hero-rise mt-3 max-w-xl text-base leading-7 text-(--muted) sm:text-lg sm:leading-8" style={{ '--d': '550ms' }}>{profile.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
          {profile.focus.map((f, i) => (
            <li key={f} className="hero-rise rounded-md border border-(--border) bg-(--card) px-2.5 py-1 font-mono text-xs text-(--muted)" style={{ '--d': `${650 + i * 70}ms` }}>{f}</li>
          ))}
        </ul>

        <div className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ '--d': '800ms' }}>
          <Button to="/#projects">
            View Projects <ArrowRight className="h-4 w-4" />
          </Button>
          {links.cv
            ? <Button href={links.cv} variant="secondary"><FileText className="h-4 w-4" /> View CV</Button>
            : <Button to="/#credentials" variant="secondary"><FileText className="h-4 w-4" /> View CV</Button>}
        </div>

        <div className="hero-rise mt-6 flex items-center gap-5 text-sm" style={{ '--d': '900ms' }}>
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
      </div>

      {/* The work is the visual: featured project web + mobile */}
      {featuredProject && <Reveal delay={350} variant="scale">
        <Link to={`/projects/${featuredProject.id}`} className="group block" aria-label={`View the ${featuredProject.name} case study`}>
          <div className="float-slow">
            <div className="tilt">
              <FeaturedVisual project={featuredProject} width={1200} />
            </div>
          </div>
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
      <dl className="stagger grid overflow-hidden rounded-2xl border border-(--border) bg-(--border) sm:grid-cols-2 lg:grid-cols-4 gap-px">
        {facts.map((f, i) => (
          <div key={f.label} className="spotlight bg-(--card) p-5" style={{ '--i': i * 2 }}>
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
