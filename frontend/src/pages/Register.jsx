import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import axios from 'axios';
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:5000';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(loginFailure('Passwords do not match'));
      return;
    }

    dispatch(loginStart());

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      dispatch(loginSuccess(response.data));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'Registration failed. Please try again.'));
    }
  };

  const { name, email, password, confirmPassword } = formData;

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8 border border-amber-100">
          <h1 className="text-2xl font-bold mb-6 text-center text-amber-800">
            Create your account
          </h1>
          {error && error !== 'No token found' && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
              aria-live="assertive"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                  <FaUser />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Full Name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                  <FaEnvelope />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Email address"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                  <FaLock />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 pl-10 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-amber-800 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                  <FaLock />
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="shadow appearance-none border border-amber-300 rounded w-full py-2 px-3 pl-10 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-amber-800 focus:outline-none"
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? <FaSpinner className="animate-spin mr-2" /> : 'Create account'}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-amber-600 hover:text-amber-800 font-bold">Sign in</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
