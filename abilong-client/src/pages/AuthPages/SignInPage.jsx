import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-(--border) bg-(--glass) backdrop-blur-sm px-4 py-3 text-sm text-(--text) outline-none transition-all duration-200 placeholder:text-(--muted) focus:border-[#00d4ff]/60 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.10)] focus:bg-(--card)';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginUser({ email, password });

      if (data.user.type === 'viewer') {
        setError('Viewer accounts are not permitted to log in.');
        return;
      }

      localStorage.setItem('token',     data.token);
      localStorage.setItem('firstName', data.user.firstName);
      localStorage.setItem('type',      data.user.type);
      navigate('/dashboard', { state: { firstName: data.user.firstName, type: data.user.type } });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
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

      {error && (
        <p className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-(--text)">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClasses}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full py-3">
          Log In
        </Button>
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
