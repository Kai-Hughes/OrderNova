import React, { useState } from 'react';
import { signup } from '../services/signupAuthenticate';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await signup(email, password, name, phone);
      setMessage(result.message);
    } catch (error) {
      const axiosError = error;
      console.error('Full error:', axiosError);
      if (axiosError.response) {
        const errorData = axiosError.response.data;
        setMessage(`Error: ${errorData.error}`);
      } else {
        setMessage(`Unexpected Error: ${axiosError.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="w-full px-8 py-4 bg-[#0d0d1a] flex justify-between items-center">
        <h1 className="text-2xl font-bold text-violet-500">OrderNova</h1>
        <Link to="/login" className="text-sm text-violet-400 hover:underline">Login</Link>
      </header>

      {/* Form */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-violet-500 mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm mb-1 text-gray-300">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Phone Number</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required
                className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-white text-sm" />
            </div>
            <button type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md transition">
              Sign Up
            </button>
          </form>

          {message && <p className="text-center text-sm text-red-400 mt-4">{message}</p>}

          <p className="text-sm text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:underline">Login</Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-4">
        &copy; {new Date().getFullYear()} OrderNova. All rights reserved.
      </footer>
    </div>
  );
};

export default SignupForm;
