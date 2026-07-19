import React from 'react';
import { ShoppingBag, Search, ClipboardList, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const EmptyState = ({ 
  type = 'cart', 
  title, 
  message, 
  actionText, 
  actionLink = '/menu' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'cart':
        return <ShoppingBag className="w-16 h-16 text-[#FF4D6D]" />;
      case 'orders':
        return <ClipboardList className="w-16 h-16 text-[#FF9F1C]" />;
      case 'favorites':
        return <Heart className="w-16 h-16 text-[#FF4D6D] fill-[#FF4D6D]" />;
      case 'search':
        return <Search className="w-16 h-16 text-gray-400" />;
      default:
        return <ShoppingBag className="w-16 h-16 text-[#7B61FF]" />;
    }
  };

  const getDefaultTitle = () => {
    if (title) return title;
    switch (type) {
      case 'cart': return 'Your Cart is Empty';
      case 'orders': return 'No Orders Placed Yet';
      case 'favorites': return 'No Favorites Yet';
      case 'search': return 'No Results Found';
      default: return 'Nothing to see here';
    }
  };

  const getDefaultMessage = () => {
    if (message) return message;
    switch (type) {
      case 'cart': return 'Browse our premium menu and add your favorite meals to get started.';
      case 'orders': return 'Hungry? Place your first order today and track its delivery live.';
      case 'favorites': return 'Mark meals as favorites to see them collected here for quick ordering.';
      case 'search': return 'We couldn\'t find matches for your search. Try different keywords or browse categories.';
      default: return 'It looks like this section has no items at the moment.';
    }
  };

  const getDefaultActionText = () => {
    if (actionText) return actionText;
    switch (type) {
      case 'cart': return 'Explore Menu';
      case 'orders': return 'Order Delicious Meal';
      case 'favorites': return 'View Menu';
      case 'search': return 'Browse All Meals';
      default: return 'Back to Home';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm max-w-lg mx-auto my-8"
    >
      <div className="p-4 bg-gray-50 rounded-full mb-4">
        {getIcon()}
      </div>
      <h3 className="text-xl font-bold text-[#1F2937] mb-2">{getDefaultTitle()}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">{getDefaultMessage()}</p>
      
      {actionLink && (
        <Link 
          to={actionLink}
          className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#FF4D6D] to-[#E63956] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm"
        >
          {getDefaultActionText()}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </motion.div>
  );
};

export default EmptyState;
