import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // danger, warning, info
  loading = false,
}) => {
  if (!isOpen) return null;

  const getTypeColor = () => {
    switch (type) {
      case 'danger': return 'text-red-500 bg-red-50 border-red-100';
      case 'warning': return 'text-amber-500 bg-amber-50 border-amber-100';
      case 'info': return 'text-blue-500 bg-blue-50 border-blue-100';
      default: return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-hidden z-10 border border-gray-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex gap-4">
            <div className={`p-3 rounded-2xl border ${getTypeColor()} h-12 w-12 flex items-center justify-center shrink-0`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{message}</p>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <AnimatedButton
                  variant={type === 'danger' ? 'danger' : type === 'warning' ? 'orange' : 'primary'}
                  onClick={onConfirm}
                  disabled={loading}
                  className="px-4 py-2.5 text-sm !rounded-xl !h-auto !py-2.5"
                >
                  {loading ? 'Processing...' : confirmText}
                </AnimatedButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
