import { FileText, GraduationCap, Award, CirclePlay, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Section from '../portfolio/Section';
import Reveal from '../portfolio/Reveal';
import { GithubIcon, LinkedinIcon } from '../portfolio/icons';
import { useLinks } from '../../data/documents';

const buildDocuments = (links) => [
  { title: 'Curriculum Vitae', meta: 'CV · PDF', href: links.cv, icon: FileText, primary: true },
  { title: 'Transcript of Records', meta: links.uploaded.transcript ? 'Academic record · PDF' : 'Academic record · Google Drive', href: links.transcript, icon: GraduationCap },
  { title: 'Certifications', meta: 'Credentials & training', to: '/#certifications', icon: Award },
  { title: 'GitHub', meta: 'Code & repositories', href: links.github, icon: GithubIcon },
  { title: 'LinkedIn', meta: 'Professional profile', href: links.linkedin, icon: LinkedinIcon },
  { title: 'Video Introduction', meta: 'Short personal intro', href: links.video, icon: CirclePlay },
];

const DocCard = ({ doc, delay }) => {
  const Icon = doc.icon;
  const available = Boolean(doc.href || doc.to);
  const body = (
    <>
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          doc.primary ? 'bg-gradient-accent text-white' : 'bg-(--accent-soft) text-(--accent)'
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold text-(--text)">{doc.title}</span>
        <span className="mt-0.5 block text-sm text-(--muted)">{available ? doc.meta : 'Available on request'}</span>
      </span>
      {available && (
        <ArrowUpRight className="h-5 w-5 shrink-0 text-(--subtle) transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-(--accent)" aria-hidden="true" />
      )}
    </>
  );
  const cls = `group flex items-center gap-4 rounded-2xl border bg-(--card) p-5 transition-all ${
    available ? 'spotlight border-(--border) hover:-translate-y-1 hover:border-(--accent-ring) hover:shadow-(--shadow-lift)' : 'border-dashed border-(--border-strong)'
  }`;

  return (
    <Reveal as="li" delay={delay}>
      {doc.to ? (
        <Link to={doc.to} className={cls}>{body}</Link>
      ) : doc.href ? (
        <a href={doc.href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </Reveal>
  );
};

const Credentials = () => {
  const links = useLinks();
  const documents = buildDocuments(links);
  return (
  <Section
    id="credentials"

    eyebrow="CV & Credentials"
    title="Documents & profiles"
    intro="Everything a recruiter usually asks for, in one place."
  >
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc, i) => <DocCard key={doc.title} doc={doc} delay={i * 50} />)}
    </ul>
  </Section>
  );
};

export default Credentials;
