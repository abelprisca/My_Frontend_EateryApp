import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Bookmark, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmptyState from '../components/ui/EmptyState';
import AnimatedCard from '../components/ui/AnimatedCard';

export const Cart = () => {
  const { 
    cartItems, 
    activeItems, 
    savedItems, 
    subtotal, 
    deliveryFee, 
    total, 
    updateQuantity, 
    removeFromCart, 
    toggleSaveForLater 
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState 
          type="cart" 
          title="Your Shopping Cart is Empty" 
          message="Look like you haven't added anything delicious yet. Browse our menu to satisfy your cravings!"
          actionText="Find Some Food"
          actionLink="/menu"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-pink-50 text-[#FF4D6D] rounded-2xl">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-800">My Shopping Cart</h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">
            {activeItems.length} active items • {savedItems.length} saved
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Side: Active Cart Items list */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {activeItems.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center flex flex-col items-center gap-4">
              <p className="text-xs text-gray-400 font-bold">No active items in cart.</p>
              {savedItems.length > 0 && (
                <p className="text-[11px] text-gray-400">You have items in your "Saved for Later" section below.</p>
              )}
              <Link to="/menu">
                <button className="px-5 py-2.5 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white font-bold text-xs rounded-xl shadow-md">
                  Explore Menu
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {activeItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    {/* Food Photo and Name */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border shrink-0" />
                      <div className="overflow-hidden">
                        <h4 className="font-extrabold text-xs text-gray-800 truncate max-w-[200px]">{item.name}</h4>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{item.category}</span>
                        <p className="text-xs font-black text-[#FF4D6D] mt-1">${item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Quantity controls & actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity Selector */}
                      <div className="flex items-center bg-gray-50 border border-gray-150 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-150 text-gray-500 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-extrabold text-gray-800 w-8 text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-150 text-gray-500 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Row Total */}
                      <span className="text-xs font-black text-gray-700 w-16 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Control buttons */}
                      <div className="flex gap-2">
                        {/* Save for later bookmark */}
                        <button
                          onClick={() => toggleSaveForLater(item.id)}
                          className="p-2 hover:bg-orange-50 text-gray-400 hover:text-[#FF9F1C] rounded-xl transition-all"
                          title="Save for Later"
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                        {/* Remove trash */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-xl transition-all"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Saved for Later Section */}
          {savedItems.length > 0 && (
            <div className="mt-8 flex flex-col gap-4">
              <div className="border-b border-gray-100 pb-2 mb-2">
                <h3 className="text-sm font-bold text-gray-700">Saved for Later ({savedItems.length})</h3>
                <p className="text-[10px] text-gray-400">These items will not be included in checkout until you move them back.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white border border-gray-100 p-4.5 rounded-2xl shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      <div>
                        <h4 className="font-extrabold text-xs text-gray-800 line-clamp-1">{item.name}</h4>
                        <span className="text-[10px] font-bold text-[#FF4D6D]">${item.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSaveForLater(item.id)}
                        className="px-3 py-1.5 bg-pink-50 hover:bg-[#FF4D6D] text-[#FF4D6D] hover:text-white rounded-lg font-bold text-[10px] transition-all"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-24 flex flex-col gap-6">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider border-b border-gray-55 pb-3">
              Order Summary
            </h3>

            {/* Calculations List */}
            <div className="flex flex-col gap-3 text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal ({activeItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-bold text-gray-700">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-extrabold bg-green-50 px-2 py-0.5 rounded text-[10px] uppercase">Free</span>
                ) : (
                  <span className="font-bold text-gray-700">${deliveryFee.toFixed(2)}</span>
                )}
              </div>
              
              {/* Free delivery target reminder */}
              {subtotal < 50 && subtotal > 0 && (
                <div className="bg-[#FFF7F8] border border-pink-50 rounded-xl p-3 text-[10px] text-pink-700 font-semibold leading-relaxed mt-1">
                  Add <span className="font-extrabold text-[#FF4D6D]">${(50 - subtotal).toFixed(2)}</span> more to qualify for <span className="font-extrabold">FREE Delivery</span>!
                </div>
              )}
            </div>

            {/* Total Row */}
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-700">Total Bill</span>
              <span className="text-xl font-black text-[#FF4D6D]">${total.toFixed(2)}</span>
            </div>

            {/* Promo Code placeholder */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (EATERY10)"
                disabled={activeItems.length === 0}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#FF4D6D] disabled:opacity-50"
              />
              <button 
                onClick={() => toast.success('10% Discount applied! (Simulated)')}
                disabled={activeItems.length === 0}
                className="px-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
              >
                Apply
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-2">
              <Link to="/checkout" className="w-full">
                <button
                  disabled={activeItems.length === 0}
                  className="w-full py-3.5 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white rounded-2xl font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/menu" className="text-center">
                <button className="text-xs font-bold text-gray-500 hover:text-[#FF4D6D] transition-colors flex items-center justify-center gap-1 mx-auto py-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
