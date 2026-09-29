import { Mail, ArrowUpRight } from 'lucide-react';
import Reveal from '../portfolio/Reveal';
import { Eyebrow } from '../portfolio/Section';
import Button from '../Button';
import { GithubIcon, LinkedinIcon } from '../portfolio/icons';
import { usePortfolio } from '../../context/PortfolioContext';

const handle = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const Contact = () => {
  const { contact, links, profile } = usePortfolio();
  const channels = [
    // Long addresses use a smaller size so the card stays one line tall like the others
    links.email && { label: 'Email', value: links.email, href: `mailto:${links.email}`, icon: Mail, small: links.email.length > 22 },
    links.linkedin && { label: 'LinkedIn', value: profile.name, href: links.linkedin, icon: LinkedinIcon },
    links.github && { label: 'GitHub', value: handle(links.github), href: links.github, icon: GithubIcon },
  ].filter(Boolean);

  return (
    <section id="contact" className="border-t border-(--border) first:border-t-0 px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="scale" className="relative overflow-hidden rounded-3xl border border-(--border) bg-(--card) px-6 py-14 text-center shadow-(--shadow-card) sm:px-12 sm:py-20">
          <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="relative">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-4 text-4xl font-bold text-(--text) sm:text-5xl">{contact.headline}</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-(--muted) sm:text-lg">{contact.body}</p>

            {links.email && (
              <div className="mt-8">
                <Button href={`mailto:${links.email}`}>
                  <Mail className="h-4 w-4" /> Send an email
                </Button>
              </div>
            )}

            <ul className="stagger mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-3">
              {channels.map(({ label, value, href, icon, small }, i) => {
                const Icon = icon;
                return (
                <li key={label} style={{ '--i': i * 3 }} className="w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)]">
                  <a
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group spotlight flex items-center gap-3 rounded-2xl border border-(--border) bg-(--base) p-4 text-left transition-all hover:-translate-y-1 hover:border-(--accent-ring) hover:shadow-(--shadow-lift)"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--accent-soft) text-(--accent)">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-(--subtle)">{label}</span>
                      <span title={small ? value : undefined} className={`block truncate font-semibold text-(--text) ${small ? 'text-xs tracking-tight' : 'text-sm'}`}>{value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-(--subtle) transition-colors group-hover:text-(--accent)" aria-hidden="true" />
                  </a>
                </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
