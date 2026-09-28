import { Headset, Flag, GraduationCap } from 'lucide-react';
import Section, { Chip } from '../portfolio/Section';
import Reveal from '../portfolio/Reveal';
import { usePortfolio } from '../../context/PortfolioContext';

const TimelineItem = ({ item, icon, delay }) => {
  const Icon = icon;
  return (
  <Reveal as="li" delay={delay} className="relative grid gap-4 md:grid-cols-[11rem_1fr] md:gap-8">
    <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
      {item.period && <p className="font-mono text-sm text-(--subtle)">{item.period}</p>}
    </div>
    <div className="surface p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--accent-soft) text-(--accent)">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h4 className="text-lg font-semibold leading-snug text-(--text)">{item.role}</h4>
          {item.org && <p className="mt-0.5 text-sm font-medium text-(--muted)">{item.org}</p>}
        </div>
      </div>
      <ul className="mt-5 space-y-2.5">
        {(item.points ?? []).map((pt) => (
          <li key={pt} className="flex gap-3 text-sm leading-6 text-(--muted)">
            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-(--accent)" aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>
      {item.tags?.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {item.tags.map((t) => <li key={t}><Chip>{t}</Chip></li>)}
        </ul>
      )}
    </div>
  </Reveal>
  );
};

const Group = ({ title, children }) => (
  <div>
    <Reveal as="h3" className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-(--subtle)">{title}</Reveal>
    <ul className="space-y-6">{children}</ul>
  </div>
);

const Experience = () => {
  const { experience, leadership, education } = usePortfolio();
  return (
  <Section
    id="experience"

    eyebrow="Experience"
    title="Experience & leadership"
    intro="Hands-on technical support work and student leadership that shaped how I communicate, solve problems, and coordinate people."
    alt
  >
    <div className="space-y-16">
      <Group title="Work">
        {experience.map((e, i) => <TimelineItem key={`${e.role}-${i}`} item={e} icon={Headset} delay={i * 60} />)}
      </Group>

      {leadership.length > 0 && <Group title="Leadership">
        {leadership.map((e, i) => <TimelineItem key={`${e.role}-${i}`} item={e} icon={Flag} delay={i * 60} />)}
      </Group>}

      <div id="education">
        <Reveal as="h3" className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-(--subtle)">Education</Reveal>
        <ul className="space-y-4">
          {education.map((ed, i) => (
            <Reveal as="li" key={`${ed.degree}-${ed.school}`} delay={i * 60} className="grid gap-4 md:grid-cols-[11rem_1fr] md:gap-8">
              <p className="font-mono text-sm text-(--subtle)">{ed.period}</p>
              <div className="surface flex items-start gap-4 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--accent-soft) text-(--accent)">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="text-lg font-semibold text-(--text)">{ed.degree}</h4>
                  <p className="mt-0.5 text-sm font-medium text-(--muted)">{ed.school}</p>
                  {ed.detail && <p className="mt-2 text-sm text-(--muted)">{ed.detail}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  </Section>
  );
};

export default Experience;
