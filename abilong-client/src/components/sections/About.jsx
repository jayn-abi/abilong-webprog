import { SquareKanban, Repeat, ShieldCheck, Lightbulb, Users } from 'lucide-react';
import Section from '../portfolio/Section';
import Reveal from '../portfolio/Reveal';
import { usePortfolio } from '../../context/PortfolioContext';

const icons = [SquareKanban, Repeat, ShieldCheck, Lightbulb, Users];

const About = () => {
  const { about, profile, education } = usePortfolio();
  return (
  <Section id="about" eyebrow="About" title="An IT student who builds software and coordinates the work around it.">
    <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr]">
      <Reveal variant="left">
        {about.paragraphs.map((p) => (
          <p key={p} className="mb-4 text-base leading-7 text-(--muted) last:mb-0">{p}</p>
        ))}

        <dl className="mt-8 divide-y divide-(--border) rounded-2xl border border-(--border) bg-(--card)">
          {[
            education[0] && ['Program', education[0].degree],
            education[0] && ['University', `${education[0].school} · ${education[0].period}`],
            ['Based in', profile.location],
            ['Looking for', 'Internships in PM, QA & IT'],
            about.languages && ['Languages', about.languages],
          ].filter(Boolean).map(([k, v]) => (
            <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3.5 text-sm">
              <dt className="text-(--subtle)">{k}</dt>
              <dd className="font-medium text-(--text)">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div>
        <Reveal as="h3" className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-(--subtle)">Interests</Reveal>
        <ul className="grid gap-3 sm:grid-cols-2">
          {about.interests.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal as="li" key={item.title} delay={i * 60} className="surface spotlight card-lift p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--accent-soft) text-(--accent)">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <h4 className="mt-4 text-base font-semibold text-(--text)">{item.title}</h4>
                <p className="mt-1.5 text-sm leading-6 text-(--muted)">{item.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </div>
  </Section>
  );
};

export default About;
