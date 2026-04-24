import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-(--border) bg-(--glass) backdrop-blur-sm px-4 py-3 text-sm text-(--text) outline-none transition-all duration-200 placeholder:text-(--muted) focus:border-[#00d4ff]/60 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.10)] focus:bg-(--card)';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted) mb-3">
        Welcome back
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
        Log In
      </h1>
      <p className="mt-3 text-sm leading-6 text-(--muted)">
        Access your account using the same monochrome wireframe language used across the site.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-(--text)">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="Placeholder"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-(--text)">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Placeholder"
            autoComplete="current-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-(--muted)">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-(--muted) cursor-pointer">
            <input type="checkbox" className="h-4 w-4 rounded border-(--border) accent-[#00d4ff]" />
            <span>Remember me</span>
          </label>
          <button type="button" className="text-xs font-medium text-(--muted) transition hover:text-[#00d4ff]">
            Forgot Password?
          </button>
        </div>

        <Button type="submit" variant="primary" className="w-full py-3">
          Log In
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className="w-full py-3">
            Log In with Google
          </Button>
          <Button type="button" variant="secondary" className="w-full py-3">
            Log In with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-(--border) pt-6 text-sm text-(--muted)">
        No account yet?{' '}
        <Link to="/auth/signup" className="font-semibold text-[#00d4ff] transition hover:text-[#a855f7]">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
