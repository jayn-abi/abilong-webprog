import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/Button';
import Reveal from '../../components/portfolio/Reveal';
import { CaseStudy, ProjectCard } from '../../components/portfolio/CaseStudy';
import { usePortfolio } from '../../context/PortfolioContext';

// Case-study page for a single project: /projects/:id
const ProjectDetailPage = () => {
  const { id } = useParams();
  const { projects } = usePortfolio();
  const project = projects.find((p) => p.id === id);
  const others = projects.filter((p) => p.id !== id).slice(0, 3);

  useEffect(() => {
    if (project) document.title = `${project.name} — Gyrzzel Jhyne Abilong`;
  }, [project]);

  if (!project) {
    return (
      <section className="px-4 py-28 text-center sm:px-6">
        <h1 className="text-3xl font-bold text-(--text)">Project not found</h1>
        <p className="mt-3 text-(--muted)">It may have been renamed or removed.</p>
        <div className="mt-8"><Button to="/projects">Back to projects</Button></div>
      </section>
    );
  }

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-(--muted) transition-colors hover:text-(--accent)">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>
        <div className="mt-6">
          <CaseStudy project={project} headingLevel="h1" eyebrow={project.featured ? 'Featured project' : project.tagline} />
        </div>

        {others.length > 0 && (
          <>
            <Reveal as="h2" className="mt-20 mb-6 text-2xl font-bold text-(--text)">Other projects</Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 80} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectDetailPage;
