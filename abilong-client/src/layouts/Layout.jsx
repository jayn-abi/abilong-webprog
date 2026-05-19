import { Outlet } from "react-router-dom";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = () => {

  const location = useLocation();
  const pathname = location.pathname;
 
    useEffect(() => {
    if (pathname === "/" || pathname === "") {
      document.title = "";
    } else if (pathname.includes("about")) {
      document.title = "About";
    } else if (pathname.includes("articles")) {
      document.title = "Articles";
    } else {
      document.title = "";
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-(--base) text-(--text) transition-colors duration-300">
      <NavBar />
      <main className="pb-16 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
