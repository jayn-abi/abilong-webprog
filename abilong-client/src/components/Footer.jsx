import { Link } from "react-router-dom";
import { Mail, ArrowUp } from "lucide-react";
import { BrandMark } from "./NavBar";
import { GithubIcon, LinkedinIcon } from "./portfolio/icons";
import { usePortfolio } from "../context/PortfolioContext";
import { useLinks } from "../data/documents";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = usePortfolio();
  const links = useLinks();

  const sections = [
    { label: "About", to: "/#about" },
    { label: "Projects", to: "/#projects" },
    { label: "Skills", to: "/#skills" },
    { label: "Experience", to: "/#experience" },
    { label: "Contact", to: "/#contact" },
  ];

  const resources = [
    { label: "CV", href: links.cv },
    { label: "Transcript of Records", href: links.transcript },
    { label: "Certifications", to: "/#certifications" },
    { label: "Video Introduction", href: links.video },
    { label: "Articles", to: "/articles" },
  ].filter((r) => r.to || r.href);

  const socials = [
    { label: "GitHub", href: links.github, icon: <GithubIcon /> },
    { label: "LinkedIn", href: links.linkedin, icon: <LinkedinIcon /> },
    { label: "Email", href: links.email && `mailto:${links.email}`, icon: <Mail className="h-4 w-4" /> },
  ].filter((s) => s.href);

  const linkClass = "text-sm text-(--muted) transition-colors hover:text-(--accent)";

  return (
    <footer className="border-t border-(--border) bg-(--card) transition-colors duration-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-sm text-sm leading-6 text-(--muted)">
            {profile.title} in the {profile.location}, building toward a career in technology project management and QA.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) text-(--muted) transition-colors hover:border-(--accent-ring) hover:text-(--accent)"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer sections">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-(--subtle)">Sections</p>
          <ul className="flex flex-col gap-2.5">
            {sections.map((l) => (
              <li key={l.label}><Link to={l.to} className={linkClass}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer resources">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-(--subtle)">Resources</p>
          <ul className="flex flex-col gap-2.5">
            {resources.map((r) => (
              <li key={r.label}>
                {r.to
                  ? <Link to={r.to} className={linkClass}>{r.label}</Link>
                  : <a href={r.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{r.label}</a>}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-(--border)">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-(--subtle) sm:flex-row sm:px-6 lg:px-8">
          <p>© {currentYear} {profile.name}</p>
          <div className="flex items-center gap-5">
            <Link to="/auth/signin" className="transition-colors hover:text-(--accent)">Admin</Link>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }} className="inline-flex items-center gap-1 transition-colors hover:text-(--accent)">
              Back to top <ArrowUp className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
