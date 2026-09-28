import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { usePortfolio } from "../context/PortfolioContext";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Skills", to: "/skills" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
];

export const BrandMark = () => {
  const { profile } = usePortfolio();
  return (
  <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.name} — home`}>
    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-strong) bg-(--card) font-mono text-[11px] font-bold tracking-tight text-(--accent) transition-colors group-hover:border-(--accent-ring)">
      {profile.initials}
    </span>
    <span className="hidden flex-col leading-tight sm:flex">
      <span className="text-sm font-semibold text-(--text)">{profile.name}</span>
      <span className="text-[11px] text-(--subtle)">{profile.tagline}</span>
    </span>
  </Link>
  );
};

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  // Close the mobile menu whenever the page changes
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const linkClass = ({ isActive }) =>
    [
      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
      isActive
        ? "text-(--accent) bg-(--accent-soft) border border-(--accent-ring) shadow-[0_0_14px_rgba(0,212,255,0.35)]"
        : "text-(--muted) hover:text-(--text) hover:bg-(--glass) border border-transparent",
    ].join(" ");

  const mobileLinkClass = ({ isActive }) =>
    `flex min-h-12 items-center rounded-xl px-4 text-base font-medium ${
      isActive ? "bg-(--accent-soft) text-(--accent)" : "text-(--muted)"
    }`;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color] duration-300",
        scrolled || isMenuOpen
          ? "bg-(--nav-bg) backdrop-blur-md border-b border-(--border)"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) text-(--muted) transition-colors hover:border-(--accent-ring) hover:text-(--accent)"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) text-(--text) lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute inset-x-0 top-16 border-b border-(--border) bg-(--nav-bg) px-4 py-3 backdrop-blur-md lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={mobileLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
