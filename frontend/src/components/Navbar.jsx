import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [showUserModal, setShowUserModal] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
    navigate('/');
    setShowUserModal(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowUserModal(false);
      }
    };

    if (showUserModal) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showUserModal]);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Clini<span className="text-blue-200">Care</span>
            </h1>
          </div>

          {user ? (
            <div className="flex items-center space-x-6">
              {/* Navigation Links */}
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-500/20"
                >
                  Home
                </Link>
                <Link
                  to="/appointments"
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-500/20"
                >
                  Appointments
                </Link>
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-4 relative">
                <div className="hidden sm:block text-right">
                  <div className="text-xs text-blue-200">Logged in as</div>
                  <div className="text-sm font-medium text-white truncate max-w-48">
                    {user.username}
                  </div>
                </div>

                {/* User Profile Icon */}
                <button
                  ref={buttonRef}
                  onClick={() => setShowUserModal(!showUserModal)}
                  className="h-8 w-8 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                >
                  <span className="text-white text-sm font-semibold">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </button>

                {/* User Profile Modal */}
                {showUserModal && (
                  <div
                    ref={modalRef}
                    className="absolute top-12 right-0 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-4 z-50 transform transition-all duration-200 ease-out"
                    style={{
                      animation: showUserModal
                        ? 'modalSlideIn 0.2s ease-out'
                        : '',
                    }}
                  >
                    <div className="px-6 py-4 space-y-4">
                      {/* Username */}
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Username
                          </p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.username || 'Not provided'}
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Email Address
                          </p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.email || 'Not provided'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Log Out Button */}
                    <div className="px-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-blue-200 text-sm">Welcome to ClinicCare</div>
          )}
        </div>
      </div>

      {/* Add CSS animation styles */}
      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </nav>
  );
}
