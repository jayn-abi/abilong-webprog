import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { signupUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-(--border) bg-(--glass) backdrop-blur-sm px-4 py-3 text-sm text-(--text) outline-none transition-all duration-200 placeholder:text-(--muted) focus:border-[#00d4ff]/60 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.10)] focus:bg-(--card)';

const selectClasses = inputClasses + ' appearance-none cursor-pointer';

const errClass = 'mt-1 text-xs text-red-400';

const blankForm = {
  firstName: '', lastName: '', age: '', gender: '',
  contactNumber: '', email: '', username: '', password: '', address: '',
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState({});
  const [apiError, setApiError] = useState('');

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.firstName.trim())   next.firstName     = 'First name is required';
    if (!form.lastName.trim())    next.lastName      = 'Last name is required';
    if (!form.age.trim())         next.age           = 'Age is required';
    else if (!/^\d+$/.test(form.age.trim())) next.age = 'Age must be a number';
    if (!form.gender)             next.gender        = 'Gender is required';
    if (!form.contactNumber.trim()) next.contactNumber = 'Contact number is required';
    else if (!/^\d{11}$/.test(form.contactNumber.trim())) next.contactNumber = 'Must be exactly 11 digits';
    if (!form.email.trim())       next.email         = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.username.trim())    next.username      = 'Username is required';
    else if (/\s/.test(form.username)) next.username = 'No spaces allowed';
    if (!form.password)           next.password      = 'Password is required';
    else if (form.password.length < 8) next.password = 'At least 8 characters';
    if (!form.address.trim())     next.address       = 'Address is required';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length) { setError(errs); return; }
    setError({});

    try {
      const { data } = await signupUser({ ...form, type: 'editor' });
      localStorage.setItem('token',     data.token);
      localStorage.setItem('firstName', data.user.firstName);
      localStorage.setItem('type',      data.user.type);
      navigate('/dashboard', { state: { firstName: data.user.firstName, type: data.user.type } });
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--muted) mb-3">
        Create account
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text">
        Sign Up
      </h1>
      <p className="mt-3 text-sm leading-6 text-(--muted)">
        Fill in your details to create an account.
      </p>

      {apiError && (
        <p className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-400">
          {apiError}
        </p>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Name row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-(--text)">First Name</label>
            <input type="text" placeholder="Juan" autoComplete="given-name"
              value={form.firstName} onChange={set('firstName')} className={inputClasses} />
            {error.firstName && <p className={errClass}>{error.firstName}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-(--text)">Last Name</label>
            <input type="text" placeholder="Dela Cruz" autoComplete="family-name"
              value={form.lastName} onChange={set('lastName')} className={inputClasses} />
            {error.lastName && <p className={errClass}>{error.lastName}</p>}
          </div>
        </div>

        {/* Age + Gender row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-(--text)">Age</label>
            <input type="text" placeholder="25"
              value={form.age} onChange={set('age')} className={inputClasses} />
            {error.age && <p className={errClass}>{error.age}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-(--text)">Gender</label>
            <select value={form.gender} onChange={set('gender')} className={selectClasses}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {error.gender && <p className={errClass}>{error.gender}</p>}
          </div>
        </div>

        {/* Contact */}
        <div>
          <label className="text-sm font-medium text-(--text)">Contact Number</label>
          <input type="text" placeholder="09XXXXXXXXX"
            value={form.contactNumber} onChange={set('contactNumber')} className={inputClasses} />
          {error.contactNumber && <p className={errClass}>{error.contactNumber}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-(--text)">Email Address</label>
          <input type="email" placeholder="you@example.com" autoComplete="email"
            value={form.email} onChange={set('email')} className={inputClasses} />
          {error.email && <p className={errClass}>{error.email}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-(--text)">Address</label>
          <input type="text" placeholder="123 Main St, City"
            value={form.address} onChange={set('address')} className={inputClasses} />
          {error.address && <p className={errClass}>{error.address}</p>}
        </div>

        {/* Username + Password row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-(--text)">Username</label>
            <input type="text" placeholder="juandelacruz" autoComplete="username"
              value={form.username} onChange={set('username')} className={inputClasses} />
            {error.username && <p className={errClass}>{error.username}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-(--text)">Password</label>
            <input type="password" placeholder="••••••••" autoComplete="new-password"
              value={form.password} onChange={set('password')} className={inputClasses} />
            {error.password && <p className={errClass}>{error.password}</p>}
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full py-3">
          Create Account
        </Button>
      </form>

      <div className="mt-6 border-t border-(--border) pt-5 text-sm text-(--muted)">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-[#00d4ff] transition hover:text-[#a855f7]">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
