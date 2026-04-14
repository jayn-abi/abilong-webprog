import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-(--border) bg-(--glass) backdrop-blur-sm px-4 py-3 text-sm text-(--text) outline-none transition-all duration-200 placeholder:text-(--muted) focus:border-[#00d4ff]/60 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.10)] focus:bg-(--card)';

const SignUpPage = () => {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted) mb-3">
        Create account
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
        Sign Up
      </h1>
      <p className="mt-3 text-sm leading-6 text-(--muted)">
        Create your account with the same monochrome layout pattern and shared button treatment.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-(--text)">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Placeholder"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-(--text)">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Placeholder"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-(--text)">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="Placeholder"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-(--text)">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Placeholder"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-(--muted)">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <Button type="submit" variant="primary" className="w-full py-3">
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className="w-full py-3">
            Sign Up with Google
          </Button>
          <Button type="button" variant="secondary" className="w-full py-3">
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-(--border) pt-6 text-sm text-(--muted)">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-[#00d4ff] transition hover:text-[#a855f7]">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
