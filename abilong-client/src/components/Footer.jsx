import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/contact" },
  ];

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:jhyne@email.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-50">
      {/* Main Footer Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3 lg:items-start">

          {/* Brand Column */}
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Portfolio
            </p>
            <h2 className="text-2xl font-bold text-zinc-900">
              Jhyne's{" "}
              <span className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] bg-clip-text text-transparent">
                Space
              </span>
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-600">
              Turning ideas into real-world digital solutions. IT student. Mobile & web developer. Community advocate.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Navigation
            </p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="w-fit text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#4f46e5] hover:to-[#06b6d4] hover:bg-clip-text hover:text-transparent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Column */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-2 rounded-2xl border-2 border-zinc-900 bg-zinc-100 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-700 transition-all duration-200 hover:border-[#4f46e5] hover:bg-zinc-900 hover:text-white"
                >
                  {social.icon}
                  {social.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-zinc-900 bg-zinc-100 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">

          {/* KPI strip */}
          <div className="flex items-center gap-4">
            {[
              { value: "5", label: "Projects" },
              { value: "10+", label: "Technologies" },
              { value: "100%", label: "Commitment" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1">
                <span className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] bg-clip-text text-sm font-bold text-transparent">
                  {stat.value}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            © {currentYear} Jhyne — All rights reserved
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;