import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { AuthLayout } from './components/AuthLayout';
import { useAuth } from '../../hooks/useAuth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  const { useLogin } = useAuth();
  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate('/dashboard');
        },
        onError: (err) => {
          console.error('Login error:', err);
          // Optional: handle error UI here
        }
      }
    );
  };

  return (
    <AuthLayout
      headline={<>Protect<br />Everything<br />You Browse</>}
      description="AI-powered threat detection that keeps you safe online, in real-time."
    >
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-h3 font-bold text-neutral-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-h7 text-neutral-500 mt-2">
          Enter your email and password to access your account
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-h7 font-medium text-neutral-700 mb-1.5">Email</label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 px-4 text-h7 text-neutral-900 placeholder-neutral-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-h7 font-medium text-neutral-700 mb-1.5">Password</label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 px-4 pr-11 text-h7 text-neutral-900 placeholder-neutral-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary/30 cursor-pointer"
            />
            <span className="text-h7 text-neutral-500">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-h7 text-neutral-500 hover:text-neutral-900 font-medium transition-colors">
            Forgot Password
          </Link>
        </div>

        {/* Sign In */}
        <button
          id="login-submit"
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-full py-3 text-h7 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          <span>{isPending ? 'Sedang masuk...' : 'Sign In'}</span>
        </button>

        {/* Google */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-medium rounded-full py-3 text-h7 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Sign In with Google</span>
        </button>
      </form>

      <p className="text-center text-h7 text-neutral-400 mt-10">
        Don't have an account?{' '}
        <Link to="/register" className="text-neutral-900 font-semibold hover:underline transition-colors">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
