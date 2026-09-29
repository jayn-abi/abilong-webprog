import { ArrowUpRight } from 'lucide-react';
import Section, { Chip } from '../portfolio/Section';
import Reveal from '../portfolio/Reveal';
import { usePortfolio } from '../../context/PortfolioContext';
import { useMedia } from '../../context/MediaContext';
import { cloudinaryUrl } from '../../services/MediaService';

const Certifications = () => {
  const { certifications, learningAreas } = usePortfolio();
  const { media } = useMedia();
  return (
  <Section
    id="certifications"

    eyebrow="Certifications"
    title="Certifications & Webinars"
  >
    {certifications.length > 0 ? (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => {
          return (
            <Reveal as="li" key={c.id ?? `${c.name}-${c.year}`} delay={i * 80} variant="scale" className="surface spotlight card-lift group flex flex-col overflow-hidden">
              {media[c.media]?.url && (
                <a href={c.link || undefined} target="_blank" rel="noopener noreferrer" tabIndex={c.link ? undefined : -1} className="block aspect-[4/3] border-b border-(--border) bg-(--elevated) p-3">
                  <img src={cloudinaryUrl(media[c.media].url, 800)} alt={`${c.name} certificate`} loading="lazy" className="media-zoom h-full w-full rounded-md object-contain" />
                </a>
              )}
              <div className="flex flex-1 flex-col p-6">
              <h3 className="text-base font-semibold leading-snug text-(--text)">{c.name}</h3>
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
        <ul className="stagger mt-4 flex flex-wrap gap-2">
          {learningAreas.map((a, i) => <li key={a} style={{ '--i': i }}><Chip tone="accent">{a}</Chip></li>)}
        </ul>
      </Reveal>
    )}
  </Section>
  );
};

export default Certifications;
