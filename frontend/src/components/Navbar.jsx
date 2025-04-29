import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/useAuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Alumni Connect
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <div className="relative">
              {/* Profile Icon */}
              <button
                onClick={toggleMenu}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center focus:outline-none"
                aria-label="Profile Menu"
              >
                <img
                  src={user.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>

              {/* Popup Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;