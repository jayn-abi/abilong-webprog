import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Github, Mail, Menu, X } from "lucide-react"; 
import logo from "../assets/images/logo.png"; 

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  const navLinkClassName = ({ isActive }) =>
    [
      "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
      isActive
        ? "bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] text-white border-transparent"
        : "border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900",
    ].join(" ");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc-100/95 backdrop-blur h-20 flex items-center">
      <div className="mx-auto flex max-w-6xl w-full items-center justify-between px-4 sm:px-6 lg:px-8">

       
        <NavLink to="/" className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
         </NavLink>

        
        <nav className="hidden md:flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/jayn-abi/abilong-webprog"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] text-white hover:shadow-lg hover:shadow-[#4f46e5]/50 transition-all hover:scale-105"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-gray-200"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      
      {isMenuOpen && (
        <nav className="md:hidden mt-2 flex flex-col items-center gap-2 bg-zinc-100/95 border-t border-zinc-200 py-2">
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
        </nav>
      )}
    </header>
  );
};

export default NavBar;