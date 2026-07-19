import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am EateryBot, your culinary assistant. Ask me about our menu, popular dishes, or current delivery options!', time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: input,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const query = input.toLowerCase();
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let botResponseText = '';

      if (query.includes('jollof') || query.includes('rice')) {
        botResponseText = 'Our Gourmet Jollof Rice Special is a customer favorite! It comes with spiced grilled chicken, fried plantains (dodo), and coleslaw for $12.99. Highly recommended!';
      } else if (query.includes('chicken') || query.includes('wing')) {
        botResponseText = 'We serve delicious Spicy Garlic Chicken Wings ($9.50) with honey glaze, and our Jollof Rice also comes with perfectly seasoned grilled chicken!';
      } else if (query.includes('spicy') || query.includes('pepper')) {
        botResponseText = 'For spice lovers, we recommend our Spicy Garlic Chicken Wings or Jollof Rice. You can also specify your preferred spice level (Mild, Medium, Hot) in the order notes during checkout!';
      } else if (query.includes('burger') || query.includes('beef')) {
        botResponseText = 'Our Triple Cheese Smash Burger ($14.25) features three smash beef patties, melted cheddar, pickles, and our signature sauce on brioche bun. It is incredibly juicy!';
      } else if (query.includes('vegetarian') || query.includes('salad') || query.includes('healthy')) {
        botResponseText = 'Try our Avocado Caesar Power Salad ($11.00) loaded with fresh avocado and crisp romaine lettuce. You can request it without chicken for a vegetarian option!';
      } else if (query.includes('delivery') || query.includes('fee') || query.includes('free')) {
        botResponseText = 'We charge a standard delivery fee of $3.50. However, delivery is completely FREE for all orders above $50.00!';
      } else if (query.includes('admin') || query.includes('login')) {
        botResponseText = 'You can sign in with customer@eatery.com (customer) or admin@eatery.com (admin) using password "Password123!" to try out user and administrator dashboards!';
      } else if (query.includes('payment') || query.includes('paystack') || query.includes('flutterwave')) {
        botResponseText = 'We support Cash on Delivery (COD) for orders. Card payment, Paystack, and Flutterwave integrations are ready and coming soon in our next update!';
      } else if (query.includes('about') || query.includes('contact') || query.includes('phone')) {
        botResponseText = 'EateryApp is a premium food delivery platform. You can contact our support desk directly at support@eateryapp.com or call +234 800 EATERY.';
      } else if (query.includes('discount') || query.includes('promo') || query.includes('coupon')) {
        botResponseText = 'Use promo code EATERY10 at checkout to get a simulated 10% discount on your order!';
      } else {
        botResponseText = "I'm not sure I understand that. Try asking about 'Jollof', 'Burger', 'delivery', 'discount', or 'admin login'. I am here to help!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text: botResponseText,
          time: new Date(),
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-80 sm:w-96 h-[450px] bg-white rounded-2xl border border-gray-100 shadow-2xl flex flex-col mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-xl">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">EateryBot AI</h4>
                  <span className="text-[10px] text-pink-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Online Support
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 max-w-[80%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                >
                  <div className={`p-2 rounded-xl shrink-0 flex items-center justify-center h-8 w-8 ${msg.sender === 'user' ? 'bg-pink-50 text-[#FF4D6D]' : 'bg-gray-100 text-gray-500'}`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl shadow-sm text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-[#FF4D6D] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 max-w-[80%] self-start">
                  <div className="p-2 rounded-xl shrink-0 flex items-center justify-center h-8 w-8 bg-gray-100 text-gray-500">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#FF4D6D] rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#FF4D6D] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#FF4D6D] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2 items-center bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#FF4D6D] transition-colors"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all cursor-pointer relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
