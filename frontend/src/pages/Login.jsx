import React, { useState } from 'react';
import { login } from '../services/loginAuthenticate';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      // Persist the session token so ProtectedRoute (and authenticated API
      // calls) can actually find it.
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userEmail', email);

      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Full error:', error);

      if (error.response) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage(`Unexpected Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white tracking-tight">
            Order<span className="text-violet-500">Nova</span>
          </Link>
          <Link
            to="/signup"
            className="text-sm bg-violet-600 hover:bg-violet-500 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Login card */}
      <main className="relative flex-grow flex items-center justify-center px-4 py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_theme(colors.violet.600/0.12),_transparent_55%)]"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
              Welcome back
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">Log in to OrderNova</h2>
          </div>

          <div className="bg-gray-800/60 border border-gray-800 rounded-2xl p-8 shadow-xl shadow-black/20">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-violet-700 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Logging in…' : 'Log in'}
              </button>
            </form>

            {message && (
              <p className="text-center text-sm text-red-400 mt-5" role="alert">
                {message}
              </p>
            )}
          </div>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500 bg-gray-900 border-t border-gray-800">
        &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginForm;