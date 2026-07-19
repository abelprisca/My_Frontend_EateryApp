import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import AnimatedButton from '../components/ui/AnimatedButton';

export const Contact = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSending(true);
    // Simulate sending contact form message
    setTimeout(() => {
      setIsSending(false);
      toast.success('Your message has been sent! Our support team will respond shortly.');
      reset();
    }, 1200);
  };

  const faqs = [
    {
      q: 'How long does delivery take?',
      a: 'We average 25 to 45 minutes depending on your location and the meal preparation time. You can track your order status in real time in your profile dashboard!'
    },
    {
      q: 'Is there a minimum order amount?',
      a: 'No, there is no minimum order requirement! However, orders above $50.00 qualify for completely free delivery.'
    },
    {
      q: 'Can I cancel or change my order?',
      a: 'Orders can only be cancelled or modified if they have not entered the "preparing" stage yet. Please contact support immediately at +234 800 EATERY for urgent requests.'
    },
    {
      q: 'Do you cater for corporate events?',
      a: 'Yes, we do! We offer customized catering menus for corporate seminars, birthday events, and family gatherings. Email us at corporate@eateryapp.com with your details.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">
      {/* 1. Header Banner */}
      <section className="text-center flex flex-col gap-3 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF4D6D]">Get in touch</span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
          We Would Love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#FF9F1C]">Hear From You</span>
        </h1>
        <div className="w-12 h-1 bg-[#FF4D6D] mx-auto rounded-full mt-1"></div>
        <p className="text-sm text-gray-500 leading-relaxed mt-2">
          Have a question about our dishes, catering services, or delivery operations? Drop us a line and we will reach back in a flash.
        </p>
      </section>

      {/* 2. Contact Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Direct Info */}
        <div className="md:col-span-1 flex flex-col gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-gray-800">Support Information</h3>
          
          <div className="flex flex-col gap-5 text-xs text-gray-500">
            <div className="flex gap-3.5 items-start">
              <div className="p-2.5 bg-rose-50 text-[#FF4D6D] rounded-xl shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-700">Call Support Desk</p>
                <p className="mt-1">+234 800 EATERY (328379)</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Mon-Sat: 8am - 10pm</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start">
              <div className="p-2.5 bg-orange-50 text-[#FF9F1C] rounded-xl shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-700">Email Support</p>
                <p className="mt-1">support@eateryapp.com</p>
                <p className="text-[10px] text-gray-400 mt-0.5">We respond within 2 hours.</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start">
              <div className="p-2.5 bg-blue-50 text-[#2563EB] rounded-xl shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-700">Office Location</p>
                <p className="mt-1">15, Kingsway Road, Ikoyi, Lagos</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Nigeria</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-6">Send Us A Message</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className={`px-4 py-3 rounded-xl border ${errors.name ? 'border-red-300' : 'border-gray-250'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <span className="text-[10px] text-red-500 font-medium">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`px-4 py-3 rounded-xl border ${errors.email ? 'border-red-300' : 'border-gray-250'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
                })}
              />
              {errors.email && <span className="text-[10px] text-red-500 font-medium">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                className={`px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-300' : 'border-gray-250'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('subject', { required: 'Subject is required' })}
              />
              {errors.subject && <span className="text-[10px] text-red-500 font-medium">{errors.subject.message}</span>}
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Message</label>
              <textarea
                rows={5}
                placeholder="Write your details here..."
                className={`px-4 py-3 rounded-xl border ${errors.message ? 'border-red-300' : 'border-gray-250'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('message', { required: 'Message details are required' })}
              />
              {errors.message && <span className="text-[10px] text-red-500 font-medium">{errors.message.message}</span>}
            </div>

            <AnimatedButton
              type="submit"
              disabled={isSending}
              className="sm:col-span-2 mt-2 py-3 text-xs"
            >
              {isSending ? 'Sending...' : 'Send Message'}
              <Send className="w-3.5 h-3.5" />
            </AnimatedButton>
          </form>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <div className="flex items-center justify-center gap-1.5 text-[#FF9F1C]">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Help center</span>
          </div>
          <h2 className="text-2xl font-black text-gray-800">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto w-full flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 font-bold text-sm text-gray-800 hover:bg-[#FFF7F8] hover:text-[#FF4D6D] transition-colors text-left"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-gray-50 bg-gray-50/50"
                    >
                      <p className="p-5 text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Contact;
