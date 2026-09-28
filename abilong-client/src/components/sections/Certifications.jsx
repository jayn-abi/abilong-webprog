import { Award, BadgeCheck, ArrowUpRight, FolderOpen } from 'lucide-react';
import Section, { Chip } from '../portfolio/Section';
import Reveal from '../portfolio/Reveal';
import Button from '../Button';
import { usePortfolio } from '../../context/PortfolioContext';
import { useMedia } from '../../context/MediaContext';
import { cloudinaryUrl } from '../../services/MediaService';

// Formal certifications are visually distinct from course completions
const typeTone = (type) => (type === 'Certification' ? 'accent' : 'neutral');

const Certifications = () => {
  const { certifications, learningAreas, links } = usePortfolio();
  const { media } = useMedia();
  return (
  <Section
    id="certifications"

    eyebrow="Certifications"
    title="Certifications & training"
    intro="Formal certifications and course completions are labelled separately."
  >
    {certifications.length > 0 ? (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => {
          const Icon = c.type === 'Certification' ? BadgeCheck : Award;
          return (
            <Reveal as="li" key={c.id ?? `${c.name}-${c.year}`} delay={i * 60} className="surface flex flex-col overflow-hidden">
              {media[c.media]?.url && (
                <a href={c.link || undefined} target="_blank" rel="noopener noreferrer" tabIndex={c.link ? undefined : -1} className="block aspect-[4/3] border-b border-(--border) bg-(--elevated) p-3">
                  <img src={cloudinaryUrl(media[c.media].url, 800)} alt={`${c.name} certificate`} loading="lazy" className="h-full w-full rounded-md object-contain" />
                </a>
              )}
              <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--accent-soft) text-(--accent)">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {c.type && <Chip tone={typeTone(c.type)}>{c.type}</Chip>}
              </div>
              <h3 className="mt-5 text-base font-semibold leading-snug text-(--text)">{c.name}</h3>
              <p className="mt-1.5 text-sm text-(--muted)">
                {c.issuer}{c.year && <> · {c.year}</>}
              </p>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-sm font-semibold text-(--text) transition-colors hover:text-(--accent)"
                >
                  View credential <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              </div>
            </Reveal>
          );
        })}
      </ul>
    ) : (
      <Reveal className="surface p-6 sm:p-8">
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-(--subtle)">Current learning track</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {learningAreas.map((a) => <li key={a}><Chip tone="accent">{a}</Chip></li>)}
        </ul>
      </Reveal>
    )}

    {links.certificates && (
      <Reveal className="mt-6">
        <Button href={links.certificates} variant="secondary">
          <FolderOpen className="h-4 w-4" /> View certificate files
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </Reveal>
    )}
  </Section>
  );
};

export default Certifications;
