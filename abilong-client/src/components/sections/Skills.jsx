import { SquareKanban, CodeXml, Database, FlaskConical, Wrench } from 'lucide-react';
import Section from '../portfolio/Section';
import Reveal from '../portfolio/Reveal';
import { usePortfolio } from '../../context/PortfolioContext';

const icons = {
  'Project Management': SquareKanban,
  Development: CodeXml,
  'Database & Tools': Database,
  'QA & Testing': FlaskConical,
  'Technical Support': Wrench,
};

const Skills = () => {
  const { skillGroups } = usePortfolio();
  return (
  <Section
    id="skills"

    eyebrow="Skills"
    title="Skills, grouped by how I use them"
    intro="Drawn from coursework, team projects, and technical support work."
    alt
  >
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group, i) => {
        const Icon = icons[group.title] ?? CodeXml;
        return (
          <Reveal key={group.title} delay={i * 60} className="surface p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--accent-soft) text-(--accent)">
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-(--text)">{group.title}</h3>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {(group.items ?? []).map((item) => (
                <li key={item} className="rounded-md border border-(--border) bg-(--elevated) px-2.5 py-1.5 text-sm text-(--text)">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  </Section>
  );
};

export default Skills;
