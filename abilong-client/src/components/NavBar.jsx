import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
import logo from "../assets/images/logo.png";
import { useTheme } from "../context/ThemeContext";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClassName = ({ isActive }) =>
    [
      "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200",
      isActive
        ? "bg-[#00d4ff]/10 text-[#00d4ff] shadow-[0_0_14px_rgba(0,212,255,0.35)] border border-[#00d4ff]/30"
        : "text-(--muted) hover:text-(--text) hover:bg-(--glass) border border-transparent",
    ].join(" ");

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 h-20 flex flex-col justify-center transition-all duration-300",
        "bg-(--nav-bg) backdrop-blur-md",
        scrolled
          ? "shadow-[0_1px_0_0_rgba(0,212,255,0.25)] border-b border-[#00d4ff]/15"
          : "border-b border-(--border)",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl w-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </NavLink>

        
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>

       
        <div className="flex items-center gap-2">

          
          <Link
            to="/auth/signin"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] border border-[#a855f7]/40 text-[#a855f7] hover:bg-[#a855f7]/10 hover:shadow-[0_0_12px_rgba(168,85,247,0.35)] transition-all duration-200"
          >
            Sign In
          </Link>

         
          <a
            href="https://github.com/jayn-abi/abilong-webprog"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] bg-linear-to-r from-[#00d4ff] to-[#a855f7] text-white hover:shadow-[0_0_18px_rgba(0,212,255,0.45)] hover:scale-[1.04] transition-all duration-200"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-(--border) text-(--muted) hover:text-[#00d4ff] hover:border-[#00d4ff]/40 hover:shadow-[0_0_10px_rgba(0,212,255,0.25)] transition-all duration-200"
            aria-label="Toggle theme"
          >
            {isDark
              ? <Sun className="w-4 h-4" />
              : <Moon className="w-4 h-4" />
            }
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-(--border) text-(--muted)"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

    
      {isMenuOpen && (
        <nav className="md:hidden absolute top-20 inset-x-0 bg-(--nav-bg) backdrop-blur-md border-b border-(--border) py-4 flex flex-col items-center gap-2 z-40">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/auth/signin"
            className="mt-1 px-6 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] border border-[#a855f7]/40 text-[#a855f7] hover:bg-[#a855f7]/10 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
