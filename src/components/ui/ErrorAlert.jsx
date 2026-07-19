import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center justify-between gap-3 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
      {onClose && (
        <button 
          onClick={onClose} 
          className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded-full transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default ErrorAlert;
