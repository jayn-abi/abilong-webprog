import { Link } from 'react-router-dom';
import { ArrowUpRight, UserRound, FolderKanban, Wrench, Briefcase, Mail } from 'lucide-react';
import Section from '../portfolio/Section';
import Reveal from '../portfolio/Reveal';
import { usePortfolio } from '../../context/PortfolioContext';

// Home-page directory of the other pages, with a live one-line summary each.
const Explore = () => {
  const { featuredProject, projects, skillGroups, certifications, experience, leadership, links } = usePortfolio();

  const cards = [
    { to: '/about', icon: UserRound, title: 'About', body: 'Background, interests, and what I am working toward.' },
    {
      to: '/projects', icon: FolderKanban, title: 'Projects',
      body: projects.length
        ? `${featuredProject?.name ?? projects[0].name}${projects.length > 1 ? ` and ${projects.length - 1} more project${projects.length === 2 ? '' : 's'}` : ''}, each with a full case study.`
        : 'Projects I have built and coordinated.',
    },
    {
      to: '/skills', icon: Wrench, title: 'Skills & Certifications',
      body: `${skillGroups.length} skill areas${certifications.length ? ` · ${certifications.length} credential${certifications.length === 1 ? '' : 's'}` : ''}.`,
    },
    {
      to: '/experience', icon: Briefcase, title: 'Experience',
      body: [experience[0]?.org, leadership[0]?.role].filter(Boolean).join(' · ') || 'Work, leadership, and education.',
    },
    {
      to: '/contact', icon: Mail, title: 'Contact & CV',
      body: links.cv ? 'CV, transcript, certificates, and how to reach me.' : 'Documents and how to reach me.',
    },
  ];

  return (
    <Section id="explore" eyebrow="Explore" title="Get to know my work">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ to, icon, title, body }, i) => {
          const Icon = icon;
          return (
          <Reveal as="li" key={to} delay={i * 60}>
            <Link to={to} className="glass-card glow-border-hover card-lift group flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--accent-soft) text-(--accent)">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-(--subtle) transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--accent)" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-(--text)">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-(--muted)">{body}</p>
            </Link>
          </Reveal>
          );
        })}
      </ul>
    </Section>
  );
};

export default Explore;
