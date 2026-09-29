import Section from '../portfolio/Section';
import Reveal from '../portfolio/Reveal';
import { CaseStudy, ProjectCard } from '../portfolio/CaseStudy';
import { usePortfolio } from '../../context/PortfolioContext';

const Projects = () => {
  const { projects, featuredProject } = usePortfolio();
  const others = projects.filter((p) => p !== featuredProject);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Work I've built and coordinated"
      intro="Academic and team projects spanning planning, development, system integration, UI/UX, and testing. Open any project for its full case study."
    >
      {featuredProject && <CaseStudy project={featuredProject} eyebrow="Featured project" summary />}

      {others.length > 0 && (
        <>
          <Reveal as="h3" className="mt-20 mb-6 text-2xl font-bold text-(--text)">
            {featuredProject ? 'More projects' : 'Projects'}
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 80} />)}
          </div>
        </>
      )}
    </Section>
  );
};

export default Projects;
