import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Chatbot from '../components/chatbot/Chatbot';
import useCart from '../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, ShieldAlert } from 'lucide-react';

export const MainLayout = () => {
  const { loginPromptOpen, setLoginPromptOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    setLoginPromptOpen(false);
    navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
  };

  const handleRegisterClick = () => {
    setLoginPromptOpen(false);
    navigate(`/register?redirect=${encodeURIComponent(location.pathname + location.search)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Outlet page */}
      <main className="flex-1 bg-[#FFF7F8]">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating AI Chatbot */}
      <Chatbot />

      {/* Global Login Prompt Modal */}
      <AnimatePresence>
        {loginPromptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLoginPromptOpen(false)}
              className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-xs"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 overflow-hidden z-10 border border-pink-50"
            >
              {/* Close Button */}
              <button
                onClick={() => setLoginPromptOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3.5 bg-pink-50 text-[#FF4D6D] rounded-full">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">Sign In Required</h3>
                  <p className="text-xs text-gray-500 leading-relaxed px-2">
                    Please log in to add items to your cart and place orders.
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full mt-2">
                  <button
                    onClick={handleLoginClick}
                    className="w-full py-3 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white rounded-xl font-bold text-xs shadow hover:opacity-95 transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleRegisterClick}
                    className="w-full py-3 bg-gray-50 border border-gray-150 text-gray-600 rounded-xl font-bold text-xs hover:bg-[#FFF7F8] hover:text-[#FF4D6D] transition-all"
                  >
                    Create Account
                  </button>
                  <button
                    onClick={() => setLoginPromptOpen(false)}
                    className="w-full py-2.5 text-xs text-gray-400 font-bold hover:text-gray-600 transition-colors mt-1"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainLayout;
