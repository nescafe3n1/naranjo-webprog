import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign In:', { email, password });
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-zinc-900 mb-2">Welcome Back</h1>
        <p className="text-zinc-600">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl font-medium transition ${
              errors.email
                ? 'border-red-500 bg-red-50 text-muted'
                : 'border-zinc-300 bg-white text-zinc-900 focus:border-zinc-900 outline-none'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl font-medium transition ${
              errors.password
                ? 'border-red-500 bg-red-50 text-muted'
                : 'border-zinc-300 bg-white text-zinc-900 focus:border-zinc-900 outline-none'
            }`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.password}</p>}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 cursor-pointer accent-zinc-900" />
            <span className="text-zinc-600 font-medium">Remember me</span>
          </label>
          <Link to="#" className="text-zinc-900 font-bold hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Sign In Button */}
        <Button type="submit" variant="primary" className="w-full h-12 text-sm">
          Sign In
        </Button>
      </form>

      {/* Sign Up Link */}
      <p className="text-center text-zinc-600 text-sm mt-6">
        Don't have an account?{' '}
        <Link to="/auth/signup" className="text-zinc-900 font-bold hover:underline">
          Sign up
        </Link>
      </p>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-zinc-300" />
        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Or</span>
        <div className="flex-1 h-px bg-zinc-300" />
      </div>

      {/* Social Sign In */}
      <div className="space-y-3">
        <button className="w-full px-4 py-3 border-2 border-zinc-300 rounded-xl font-bold text-zinc-900 text-sm uppercase tracking-wider hover:bg-zinc-50 transition">
          Continue with Google
        </button>
        <button className="w-full px-4 py-3 border-2 border-zinc-300 rounded-xl font-bold text-zinc-900 text-sm uppercase tracking-wider hover:bg-zinc-50 transition">
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default SignInPage;