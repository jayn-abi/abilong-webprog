import Reveal from './Reveal';

export const Eyebrow = ({ children, className = '' }) => (
  <p className={`font-mono text-xs font-medium uppercase tracking-[0.18em] text-(--accent) ${className}`}>
    {children}
  </p>
);

export const Chip = ({ children, tone = 'neutral' }) => (
  <span
    className={[
      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
      tone === 'accent'
        ? 'border-(--accent-ring) bg-(--accent-soft) text-(--accent)'
        : 'border-(--border) bg-(--elevated) text-(--muted)',
    ].join(' ')}
  >
    {children}
  </span>
);

/*
 * Standard page section: consistent vertical rhythm, max width, and an
 * optional numbered header (eyebrow + heading + intro).
 */
const Section = ({ id, index, eyebrow, title, intro, alt = false, className = '', children }) => (
  <section
    id={id}
    className={`border-t border-(--border) first:border-t-0 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 ${alt ? 'bg-(--card)/40' : ''} ${className}`}
  >
    <div className="mx-auto max-w-6xl">
      {title && (
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow>
            {index && <span className="text-(--subtle)">{index} / </span>}
            {eyebrow}
          </Eyebrow>
          <h2 className="mt-3 text-3xl font-bold text-(--text) sm:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-base leading-7 text-(--muted)">{intro}</p>}
        </Reveal>
      )}
      {children}
    </div>
  </section>
);

export default Section;
