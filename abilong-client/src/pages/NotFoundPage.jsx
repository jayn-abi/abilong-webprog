import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex w-full flex-col gap-0">

      <section className="hero-mesh border-b border-(--border) px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="text-[100px] sm:text-[140px] font-bold leading-none gradient-text">
            404
          </h1>

          <h2 className="mt-2 text-3xl font-bold text-(--text)">
            Page Not Found
          </h2>

          <p className="mt-4 text-sm leading-7 text-(--muted) sm:text-base">
            The page you're looking for doesn't exist or may have been moved.
            You can go back or explore other sections of the site.
          </p>

          <div className="mt-8 glass-card rounded-[1.25rem] flex aspect-4/3 max-h-48 items-center justify-center">
            <span className="text-5xl font-bold text-(--muted)">:/</span>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button to="/articles" variant="secondary">
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </span>
            </Button>
            <Button to="/" variant="primary">
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </span>
            </Button>
          </div>

          <div className="mt-6 flex justify-center gap-4 text-sm text-(--muted)">
            <Link to="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[#00d4ff] transition-colors">About</Link>
            <span>•</span>
            <Link to="/articles" className="hover:text-[#00d4ff] transition-colors">Articles</Link>
          </div>

        </div>
      </section>

    </div>
  );
}

export default NotFoundPage;
