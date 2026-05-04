import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const AuthLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;
 
    useEffect(() => {
    if (pathname === "/" || pathname === "") {
      document.title = "cy.dev";
    } else if (pathname.includes("signin")) {
      document.title = "Sign In | cy.dev";
    } else if (pathname.includes("signup")) {
      document.title = "Sign Up | cy.dev";
    } else {
      document.title = "cy.dev";
    }
  }, [pathname]);

  return (
    <section className="min-h-screen bg-(--base) text-(--text) transition-colors duration-300">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">

        
        <div className="hidden lg:flex items-center justify-center bg-(--card) border-r border-(--border) p-16 relative overflow-hidden">
          
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#00d4ff]/8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-[#a855f7]/8 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex w-full max-w-xs flex-col items-center text-center">
           
            <div className="gradient-ring w-48 h-48 flex items-center justify-center">
              <div className="gradient-ring-inner bg-(--card) w-full h-full flex items-center justify-center">
                <img src={logo} alt="Logo" className="w-full h-full object-contain p-4" />
              </div>
            </div>

            <h2 className="mt-8 text-2xl font-bold text-(--text)">
              Creative{' '}
              <span className="gradient-text">Space</span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-(--muted)">
              Sign in to access your account.
            </p>
          </div>
        </div>

       
        <main className="flex items-center justify-center bg-(--base) px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>

      </div>
    </section>
  );
};

export default AuthLayout;
