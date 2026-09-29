import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Motion from '../components/portfolio/Motion';

const BASE_TITLE = "Gyrzzel Jhyne Abilong — IT Student · Project Management & QA";
const PAGE_TITLES = {
  articles: "Articles",
};

const Layout = () => {
  const { pathname, hash, key } = useLocation();
  const onHome = pathname === "/" || pathname === "";

  useEffect(() => {
    const [, section, detail] = pathname.split("/");
    if (section === "projects" && detail) return; // the project page sets its own title
    const page = PAGE_TITLES[section];
    document.title = page ? `${page} — Gyrzzel Jhyne Abilong` : BASE_TITLE;
  }, [pathname]);

  // New page → top; a hash (e.g. /#certifications) → that section
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) el.scrollIntoView({ block: "start" });
  }, [pathname, hash, key]);

  return (
    <div className="min-h-screen bg-(--base) text-(--text) transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-(--accent-strong) focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Motion />
      <NavBar />
      <main id="main" className={onHome ? "" : "pt-16"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
