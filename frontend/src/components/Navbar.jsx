import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { FaShoppingCart, FaSearch, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaClipboardList, FaHome, FaSeedling, FaEnvelope } from 'react-icons/fa';

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    } else {
      navigate('/products');
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo and Navigation Links */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-amber-800 flex items-center">
              <FaSeedling className="mr-2 text-amber-600" />
              Bharat Dry Fruits
            </Link>
            <div className="hidden md:flex space-x-6 ml-10">
              <Link to="/" className="text-gray-600 hover:text-amber-800 text-sm font-medium flex items-center transition-colors duration-200">
                <FaHome className="mr-1" />
                Home
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-amber-800 text-sm font-medium flex items-center transition-colors duration-200">
                <FaSeedling className="mr-1" />
                Products
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-amber-800 text-sm font-medium flex items-center transition-colors duration-200">
                <FaEnvelope className="mr-1" />
                Contact
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dry fruits..."
                className="w-full px-4 py-2 text-sm text-gray-700 bg-amber-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white border border-amber-200"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-amber-700 hover:text-amber-900 transition-colors duration-200"
                aria-label="Search products"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-amber-800 text-sm font-medium flex items-center transition-colors duration-200"
                  aria-label={`Cart with ${cartItems.length} items`}
                >
                  <FaShoppingCart className="mr-1" />
                  Cart ({cartItems.length})
                </Link>
                <Link
                  to="/orders"
                  className="text-gray-600 hover:text-amber-800 text-sm font-medium flex items-center transition-colors duration-200"
                  aria-label="My Orders"
                >
                  <FaClipboardList className="mr-1" />
                  My Orders
                </Link>

                {user?.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-gray-600 hover:text-amber-800 text-sm font-medium flex items-center transition-colors duration-200">
                    <FaUser className="mr-1" />
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-amber-800 text-sm font-medium flex items-center transition-colors duration-200"
                  aria-label="Logout"
                >
                  <FaSignOutAlt className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-amber-800 text-sm font-medium flex items-center transition-colors duration-200">
                  <FaSignInAlt className="mr-1" />
                  Login
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-amber-800 text-sm font-medium flex items-center transition-colors duration-200">
                  <FaUserPlus className="mr-1" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
