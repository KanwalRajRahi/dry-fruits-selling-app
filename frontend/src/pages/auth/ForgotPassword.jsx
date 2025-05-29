import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaSpinner } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5000';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
      setMessage(response.data.message || 'Password reset link sent to your email.');
    } catch (err) {
      console.error('Forgot password request failed:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to send password reset link. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8 border border-amber-100">
          <h1 className="text-2xl font-bold mb-6 text-center text-amber-800">Forgot Password</h1>
          
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Send Reset Link'}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-6">
            <Link to="/login" className="text-amber-600 hover:text-amber-800 text-sm">
              Remember your password? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword; 