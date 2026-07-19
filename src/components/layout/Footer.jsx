import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-pink-50 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 bg-gradient-to-tr from-[#FF4D6D] to-[#FF9F1C] rounded-lg flex items-center justify-center shadow-md shadow-pink-50">
                <span className="text-white font-extrabold text-lg">E</span>
              </div>
              <span className="text-lg font-black tracking-tight text-gray-900">
                Eatery<span className="text-[#FF4D6D]">App</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">
              Experience the art of fine dining delivered right to your door. Fresh ingredients, exquisite taste, and lightning-fast delivery.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a href="#" className="p-2 bg-[#FFF7F8] hover:bg-[#FF4D6D] hover:text-white rounded-xl transition-all duration-300 text-gray-500 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a href="#" className="p-2 bg-[#FFF7F8] hover:bg-[#FF4D6D] hover:text-white rounded-xl transition-all duration-300 text-gray-500 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="p-2 bg-[#FFF7F8] hover:bg-[#FF4D6D] hover:text-white rounded-xl transition-all duration-300 text-gray-500 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-sm text-gray-800 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium text-gray-500">
              <li>
                <Link to="/" className="hover:text-[#FF4D6D] transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#FF4D6D] transition-colors">Our Menu</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF4D6D] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF4D6D] transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-bold text-sm text-gray-800 uppercase tracking-wider mb-4">Business Hours</h4>
            <ul className="flex flex-col gap-2 text-xs text-gray-500">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-semibold text-gray-700">08:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold text-gray-700">09:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-semibold text-[#FF4D6D]">10:00 AM - 08:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm text-gray-800 uppercase tracking-wider mb-4">Get In Touch</h4>
            <ul className="flex flex-col gap-3 text-xs text-gray-500">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF4D6D]" />
                <span>+234 800 EATERY (328379)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF9F1C]" />
                <span>support@eateryapp.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7B61FF]" />
                <span>15, Kingsway Road, Ikoyi, Lagos, NG</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} EateryApp. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[#FF4D6D] fill-[#FF4D6D] animate-pulse" /> for delicious dining.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
