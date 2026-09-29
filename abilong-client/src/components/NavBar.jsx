import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { usePortfolio } from "../context/PortfolioContext";
import { useMedia } from "../context/MediaContext";

// Each link jumps to a section of the home page; `sections` are the ids that
// count as that link being active while scrolling.
const links = [
  { label: "Home", to: "/", sections: ["home"] },
  { label: "About", to: "/#about", sections: ["about"] },
  { label: "Projects", to: "/#projects", sections: ["projects"] },
  { label: "Skills", to: "/#skills", sections: ["skills", "certifications"] },
  { label: "Experience", to: "/#experience", sections: ["experience"] },
  { label: "Contact", to: "/#contact", sections: ["credentials", "contact"] },
];
const SECTION_IDS = links.flatMap((l) => l.sections);

// Id of the home-page section in the middle of the viewport (null elsewhere)
const useActiveSection = (enabled) => {
  const [active, setActive] = useState("home");
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [enabled]);
  return enabled ? active : null;
};

export const PROFILE_PHOTO_SLOT = "profile-photo";

// Square, face-centred crop of an uploaded Cloudinary photo
const avatarUrl = (url, size) =>
  url.includes("/upload/") ? url.replace("/upload/", `/upload/f_auto,q_auto,c_fill,g_face,w_${size},h_${size}/`) : url;

export const BrandMark = () => {
  const { profile } = usePortfolio();
  const { media } = useMedia();
  const photo = media[PROFILE_PHOTO_SLOT]?.url;
  return (
  <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.name} — home`}>
    {photo ? (
      <img
        src={avatarUrl(photo, 96)}
        alt=""
        className="h-9 w-9 shrink-0 rounded-full border border-(--border-strong) object-cover transition-colors group-hover:border-(--accent-ring)"
      />
    ) : (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-strong) bg-(--card) font-mono text-[11px] font-bold tracking-tight text-(--accent) transition-colors group-hover:border-(--accent-ring)">
        {profile.initials}
      </span>
    )}
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
  const { pathname, key } = useLocation();
  const onHome = pathname === "/";
  const activeSection = useActiveSection(onHome);

  // Close the mobile menu after any navigation, including jumps within the page
  const [menuKey, setMenuKey] = useState(key);
  if (menuKey !== key) {
    setMenuKey(key);
    setIsMenuOpen(false);
  }

  const isActive = (link) =>
    onHome ? link.sections.includes(activeSection) : link.label === "Projects" && pathname.startsWith("/projects/");

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

  const linkClass = (active) =>
    [
      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
      active
        ? "text-(--accent) bg-(--accent-soft) border border-(--accent-ring) shadow-[0_0_14px_rgba(0,212,255,0.35)]"
        : "text-(--muted) hover:text-(--text) hover:bg-(--glass) border border-transparent",
    ].join(" ");

  const mobileLinkClass = (active) =>
    `flex min-h-12 items-center rounded-xl px-4 text-base font-medium ${
      active ? "bg-(--accent-soft) text-(--accent)" : "text-(--muted)"
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
            <Link key={link.to} to={link.to} className={linkClass(isActive(link))} aria-current={isActive(link) ? "location" : undefined}>
              {link.label}
            </Link>
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
                <Link to={link.to} className={mobileLinkClass(isActive(link))} aria-current={isActive(link) ? "location" : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
