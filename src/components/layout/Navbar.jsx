import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { ShoppingCart, Menu, X, User, LogOut, Shield, Heart, ClipboardList, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin, darkMode, toggleDarkMode } = useAuth();
  const { totalItemsCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page transition
  useEffect(() => {
    setIsOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'glassmorphism shadow-md py-3' 
          : 'bg-[#FFF7F8] border-b border-pink-50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none group">
          <div className="h-10 w-10 bg-gradient-to-tr from-[#FF4D6D] to-[#FF9F1C] rounded-xl flex items-center justify-center shadow-md shadow-pink-100 group-hover:rotate-6 transition-transform">
            <span className="text-white font-extrabold text-xl">E</span>
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900">
            Eatery<span className="text-[#FF4D6D]">App</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-sm font-semibold text-gray-700 hover:text-[#FF4D6D] transition-colors py-1.5"
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF4D6D]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl hover:bg-pink-50 text-gray-700 hover:text-[#FF4D6D] dark:text-gray-300 dark:hover:text-[#FF4D6D] transition-colors"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Cart Icon */}
          <Link 
            to={isAuthenticated ? "/cart" : "/login?redirect=/cart"}
            className="p-2.5 rounded-xl hover:bg-pink-50 text-gray-700 hover:text-[#FF4D6D] transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF4D6D] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                {totalItemsCount}
              </span>
            )}
          </Link>

          {/* User Section */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-pink-50 rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-pink-200">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user?.name || "Profile"} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-pink-100 text-[#FF4D6D] flex items-center justify-center font-bold text-sm">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-xs font-bold text-gray-700 hidden lg:inline truncate max-w-[100px]">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-0" onClick={() => setProfileDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-10 flex flex-col gap-1"
                    >
                      <div className="px-3 py-2 border-b border-gray-50 mb-1">
                        <p className="text-xs font-bold text-gray-800 truncate">{user?.name}</p>
                        <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
                      </div>

                      {isAdmin && (
                        <Link 
                          to="/admin" 
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-[#FF4D6D] transition-colors"
                        >
                          <Shield className="w-4 h-4 text-[#7B61FF]" />
                          Admin Panel
                        </Link>
                      )}

                      <Link 
                        to="/profile" 
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-[#FF4D6D] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#FF4D6D]" />
                        My Profile
                      </Link>

                      <Link 
                        to="/orders" 
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-[#FF4D6D] transition-colors"
                      >
                        <ClipboardList className="w-4 h-4 text-[#FF9F1C]" />
                        Order History
                      </Link>

                      <button
                        onClick={handleLogoutClick}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login"
                className="text-xs font-bold text-gray-700 hover:text-[#FF4D6D] transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register"
                className="text-xs font-bold text-white bg-[#FF4D6D] hover:bg-[#E63956] px-4 py-2.5 rounded-xl shadow-md transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger menu */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-pink-50 text-gray-700 hover:text-[#FF4D6D] dark:text-gray-300 dark:hover:text-[#FF4D6D] transition-colors"
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Cart */}
          <Link 
            to={isAuthenticated ? "/cart" : "/login?redirect=/cart"}
            className="p-2 rounded-lg hover:bg-pink-50 text-gray-700 relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#FF4D6D] text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white">
                {totalItemsCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-pink-50 text-gray-700 hover:text-[#FF4D6D] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-pink-50 bg-white overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-[#FF4D6D]"
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t border-gray-100 my-2 pt-3 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-1.5">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-pink-200">
                        {user?.avatar ? (
                          <img src={user.avatar} alt={user?.name || "Profile"} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-pink-100 text-[#FF4D6D] flex items-center justify-center font-bold text-sm">
                            {user?.name?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                    </div>

                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-pink-50"
                      >
                        <Shield className="w-4 h-4 text-[#7B61FF]" />
                        Admin Panel
                      </Link>
                    )}

                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-pink-50"
                    >
                      <User className="w-4 h-4 text-[#FF4D6D]" />
                      My Profile
                    </Link>

                    <Link 
                      to="/orders" 
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-pink-50"
                    >
                      <ClipboardList className="w-4 h-4 text-[#FF9F1C]" />
                      Order History
                    </Link>

                    <button
                      onClick={handleLogoutClick}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 text-left w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-2 px-3">
                    <Link 
                      to="/login"
                      className="text-center font-bold text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-xs"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/register"
                      className="text-center font-bold text-white bg-[#FF4D6D] px-4 py-2.5 rounded-xl shadow-md hover:bg-[#E63956] text-xs"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
