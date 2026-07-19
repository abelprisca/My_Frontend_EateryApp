import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedCard = ({ children, className = '', index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
