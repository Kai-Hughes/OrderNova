import React, { useState } from 'react';
import { signup } from '../services/signupAuthenticate';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const result = await signup(email, password, name, phone);
      setMessage(result.message);

      // small success message delay (feels nicer)
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 800);
    } catch (error) {
      console.error('Full error:', error);

      if (error.response) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage(`Unexpected Error: ${error.message}`);
      }
      setIsSubmitting(false);
    }
  };

  const fields = [
    { id: 'name', label: 'Name', type: 'text', value: name, set: setName, icon: FaUser, placeholder: 'Jane Smith', autoComplete: 'name' },
    { id: 'phone', label: 'Phone number', type: 'text', value: phone, set: setPhone, icon: FaPhone, placeholder: '04XX XXX XXX', autoComplete: 'tel' },
    { id: 'email', label: 'Email', type: 'email', value: email, set: setEmail, icon: FaEnvelope, placeholder: 'you@company.com', autoComplete: 'email' },
    { id: 'password', label: 'Password', type: 'password', value: password, set: setPassword, icon: FaLock, placeholder: '••••••••', autoComplete: 'new-password' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white tracking-tight">
            Order<span className="text-violet-500">Nova</span>
          </Link>
          <Link to="/login" className="text-sm text-gray-300 hover:text-white font-medium transition-colors">
            Log in
          </Link>
        </div>
      </header>

      {/* Signup card */}
      <main className="relative flex-grow flex items-center justify-center px-4 py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_theme(colors.violet.600/0.12),_transparent_55%)]"
          aria-hidden="true"
        />

        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
              Get started
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">Create your account</h2>
          </div>

          <div className="bg-gray-800/60 border border-gray-800 rounded-2xl p-8 shadow-xl shadow-black/20">
            <form onSubmit={handleSubmit} className="space-y-5">
              {fields.map(({ id, label, type, value, set, icon: Icon, placeholder, autoComplete }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium mb-1.5 text-gray-300">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                    <input
                      id={id}
                      type={type}
                      value={value}
                      onChange={(e) => set(e.target.value)}
                      required
                      autoComplete={autoComplete}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                      placeholder={placeholder}
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-violet-700 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Creating account…' : 'Sign up'}
              </button>
            </form>

            {message && (
              <p
                className={`text-center text-sm mt-5 ${
                  message.toLowerCase().startsWith('error') || message.toLowerCase().startsWith('unexpected')
                    ? 'text-red-400'
                    : 'text-green-400'
                }`}
                role="status"
              >
                {message}
              </p>
            )}
          </div>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Log in
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

export default SignupForm;