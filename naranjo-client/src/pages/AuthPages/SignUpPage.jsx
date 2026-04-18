import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign Up:', formData);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-zinc-900 mb-2">Create Account</h1>
        <p className="text-zinc-600">Join us today and start your journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl font-medium transition ${
              errors.name
                ? 'border-red-500 bg-red-50 text-muted'
                : 'border-zinc-300 bg-white text-zinc-900 focus:border-zinc-900 outline-none'
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl font-medium transition ${
              errors.password
                ? 'border-red-500 bg-red-50 text-muted'
                : 'border-zinc-300 bg-white text-zinc-900 focus:border-zinc-900 outline-none'
            }`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.password}</p>}
          <p className="text-zinc-500 text-xs mt-1">At least 6 characters</p>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-xl font-medium transition ${
              errors.confirmPassword
                ? 'border-red-500 bg-red-50 text-muted'
                : 'border-zinc-300 bg-white text-zinc-900 focus:border-zinc-900 outline-none'
            }`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.confirmPassword}</p>}
        </div>

        {/* Terms & Conditions */}
        <label className="flex items-start gap-2 cursor-pointer text-xs">
          <input type="checkbox" className="w-4 h-4 cursor-pointer accent-zinc-900 mt-0.5" />
          <span className="text-zinc-600">
            I agree to the{' '}
            <Link to="#" className="text-zinc-900 font-bold hover:underline">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link to="#" className="text-zinc-900 font-bold hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Sign Up Button */}
        <Button type="submit" variant="primary" className="w-full h-12 text-sm">
          Create Account
        </Button>
      </form>

      {/* Sign In Link */}
      <p className="text-center text-zinc-600 text-sm mt-6">
        Already have an account?{' '}
        <Link to="/auth/signin" className="text-zinc-900 font-bold hover:underline">
          Sign in
        </Link>
      </p>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-zinc-300" />
        <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Or</span>
        <div className="flex-1 h-px bg-zinc-300" />
      </div>

      {/* Social Sign Up */}
      <div className="space-y-3">
        <button className="w-full px-4 py-3 border-2 border-zinc-300 rounded-xl font-bold text-zinc-900 text-sm uppercase tracking-wider hover:bg-zinc-50 transition">
          Sign up with Google
        </button>
        <button className="w-full px-4 py-3 border-2 border-zinc-300 rounded-xl font-bold text-zinc-900 text-sm uppercase tracking-wider hover:bg-zinc-50 transition">
          Sign up with GitHub
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;