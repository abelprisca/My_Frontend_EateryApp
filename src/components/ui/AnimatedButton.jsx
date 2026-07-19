import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false, 
  variant = 'primary' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300';
      case 'orange':
        return 'bg-gradient-to-r from-[#FF9F1C] to-[#E68A00] text-white shadow-md shadow-orange-100 hover:shadow-lg hover:shadow-orange-200';
      case 'secondary':
        return 'bg-white text-[#FF4D6D] border border-pink-200 hover:bg-[#FFF7F8]';
      case 'dark':
        return 'bg-[#1F2937] text-white hover:bg-gray-800';
      case 'danger':
        return 'bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white shadow-md shadow-red-100 hover:shadow-lg hover:shadow-red-200';
      case 'success':
        return 'bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white shadow-md shadow-green-100 hover:shadow-lg hover:shadow-green-200';
      default:
        return '';
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`rounded-2xl px-6 py-3 font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 select-none outline-none ${getVariantStyles()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
