// import React from 'react'

// function Home() {
//   return (
//     <div>Home this is priscilla </div>
//   )
// }

// export default Home


import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-red-50 via-white to-orange-50 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
              🍽 Fresh Food Delivered Fast
            </span>

            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mt-6 leading-tight">
              Delicious Meals
              <br />
              Delivered To
              <span className="text-red-500"> Your Doorstep</span>
            </h1>

            <p className="text-gray-600 mt-6 text-lg leading-8">
              Enjoy freshly prepared meals made with quality ingredients.
              Order your favorite dishes anytime and have them delivered
              quickly and safely.
            </p>

            <div className="flex gap-5 mt-8">
              <Link to="/menu">
                <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl flex items-center gap-2 transition">
                  Order Now
                  <ArrowRight size={20} />
                </button>
              </Link>

              <Link to="/about">
                <button className="border border-red-500 text-red-500 hover:bg-red-50 px-8 py-4 rounded-xl transition">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <h2 className="text-3xl font-bold">10K+</h2>
                <p className="text-gray-500">Happy Customers</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold">500+</h2>
                <p className="text-gray-500">Food Items</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold">4.9★</h2>
                <p className="text-gray-500">Customer Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Food"
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
          </motion.div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              Why Choose Us?
            </h2>

            <p className="text-gray-500 mt-3">
              We make food ordering simple, fast and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="text-red-500" size={35} />
              </div>

              <h3 className="text-xl font-bold">
                Fresh Meals
              </h3>

              <p className="text-gray-500 mt-4">
                Every meal is carefully prepared using quality ingredients.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-green-600" size={35} />
              </div>

              <h3 className="text-xl font-bold">
                Fast Delivery
              </h3>

              <p className="text-gray-500 mt-4">
                Receive your food hot and fresh in the shortest time possible.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-blue-600" size={35} />
              </div>

              <h3 className="text-xl font-bold">
                Secure Payments
              </h3>

              <p className="text-gray-500 mt-4">
                Your payment information is protected with secure checkout.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}

      <section className="py-24 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-5xl font-black">
            Ready To Order?
          </h2>

          <p className="mt-6 text-lg text-red-100">
            Explore our menu and enjoy your favorite meals today.
          </p>

          <Link to="/menu">
            <button className="bg-white text-red-500 px-10 py-4 rounded-xl font-bold mt-10 hover:scale-105 transition">
              Browse Menu
            </button>
          </Link>

        </div>
      </section>

    </div>
  );
}

export default Home;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Star, ShieldCheck, Truck, Utensils, Heart } from 'lucide-react';
// import { motion } from 'framer-motion';
// import API from '../services/api';
// import AnimatedCard from '../components/ui/AnimatedCard';
// import AnimatedButton from '../components/ui/AnimatedButton';
// import SkeletonLoader from '../components/ui/SkeletonLoader';

// export const Home = () => {
//   const [featuredMeals, setFeaturedMeals] = useState([]);
//   const [loading, setLoading] = useState(true);

//  useEffect(() => {
//   const fetchFeatured = async () => {
//     try {
//       // const { data } = await API.get('/meals');

//       setFeaturedMeals(
//         data.filter((m) => m.popular).slice(0, 3)
//       );
//     } catch (err) {
//       console.error('Error loading featured meals:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchFeatured();
// }, []);

//   const categories = [
//     { name: 'Rice Dishes', icon: '🍚', count: '12 Items' },
//     { name: 'Pasta & Noodles', icon: '🍝', count: '8 Items' },
//     { name: 'Burgers & Fast Food', icon: '🍔', count: '15 Items' },
//     { name: 'Healthy Salads', icon: '🥗', count: '9 Items' },
//     { name: 'Appetizers', icon: '🍟', count: '7 Items' },
//     { name: 'Drinks & Mocktails', icon: '🍹', count: '11 Items' },
//   ];

//   const testimonials = [
//     {
//       id: 1,
//       name: 'Sophia Carter',
//       role: 'Food Enthusiast',
//       comment: 'The Jollof Rice Special was mind-blowing! Extremely rich flavor, prompt delivery, and packaging that keeps the food hot.',
//       rating: 5,
//       avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
//     },
//     {
//       id: 2,
//       name: 'Daniel Okafor',
//       role: 'Software Engineer',
//       comment: 'Super convenient when coding late nights. The burgers are exceptionally juicy, and the delivery drivers are always polite.',
//       rating: 5,
//       avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
//     },
//     {
//       id: 3,
//       name: 'Mariam Bello',
//       role: 'Fitness Coach',
//       comment: 'EateryApp salad collections are fresh, nutritious, and calorie-conscious. Perfect for maintaining my strict macro goals!',
//       rating: 5,
//       avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
//     }
//   ];

//   // Animation variants
//   const floatingVariants = {
//     animate: {
//       y: [0, -15, 0],
//       rotate: [0, 5, 0],
//       transition: {
//         duration: 6,
//         repeat: Infinity,
//         ease: 'easeInOut',
//       }
//     }
//   };

//   const floatingVariantsAlt = {
//     animate: {
//       y: [0, 15, 0],
//       rotate: [0, -5, 0],
//       transition: {
//         duration: 8,
//         repeat: Infinity,
//         ease: 'easeInOut',
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col gap-20 pb-20 overflow-hidden">
//       {/* 1. Hero Section */}
//       <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-[#FFEBEF] to-[#FFF7F8] pt-12 md:pt-0">
//         {/* Floating Shapes */}
//         <motion.div 
//           variants={floatingVariants}
//           animate="animate"
//           className="absolute top-20 left-10 w-16 h-16 bg-[#FFF0E0] rounded-full filter blur-xl opacity-70 hidden md:block"
//         />
//         <motion.div 
//           variants={floatingVariantsAlt}
//           animate="animate"
//           className="absolute bottom-20 right-20 w-24 h-24 bg-[#EBE9FF] rounded-full filter blur-2xl opacity-60 hidden md:block"
//         />
//         <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-pink-100 rounded-full filter blur-3xl opacity-50" />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
//           {/* Left Column: Headline */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col gap-6"
//           >
//             <span className="self-start px-4 py-1.5 bg-[#FFE5E9] text-[#FF4D6D] rounded-full text-xs font-bold uppercase tracking-wider">
//               ✨ Best Food Delivery in Town
//             </span>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
//               Savor Gourmet <br />
//               Meals In The <br />
//               Comfort of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#FF9F1C]">Your Home</span>
//             </h1>
//             <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-lg">
//               Indulge in a premium dining experience. EateryApp connects you with top culinary chefs, offering fresh, delicious dishes delivered in minutes.
//             </p>
//             <div className="flex flex-wrap items-center gap-4 mt-2">
//               <Link to="/menu">
//                 <AnimatedButton className="px-7 py-3.5 text-sm !rounded-2xl">
//                   Order Food Now
//                   <ArrowRight className="w-4 h-4" />
//                 </AnimatedButton>
//               </Link>
//               <Link to="/about">
//                 <AnimatedButton variant="secondary" className="px-7 py-3.5 text-sm !rounded-2xl">
//                   Learn More
//                 </AnimatedButton>
//               </Link>
//             </div>
            
//             {/* Quick Metrics */}
//             <div className="grid grid-cols-3 gap-4 border-t border-gray-150 pt-8 mt-4">
//               <div>
//                 <h4 className="text-2xl font-black text-gray-800">50k+</h4>
//                 <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">Active Users</p>
//               </div>
//               <div>
//                 <h4 className="text-2xl font-black text-gray-800">120+</h4>
//                 <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">Expert Chefs</p>
//               </div>
//               <div>
//                 <h4 className="text-2xl font-black text-gray-800">4.9★</h4>
//                 <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">App Rating</p>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Column: Hero Image */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, type: 'spring' }}
//             className="relative flex justify-center"
//           >
//             {/* Decorative backing plate */}
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D6D]/10 to-[#FF9F1C]/10 rounded-full filter blur-xl scale-95" />
            
//             {/* Floating food elements overlay */}
//             <motion.div
//               variants={floatingVariants}
//               animate="animate"
//               className="w-[280px] sm:w-[380px] lg:w-[450px] aspect-square rounded-full overflow-hidden border-[10px] border-white shadow-2xl relative"
//             >
//               <img 
//                 src="https://images.unsplash.com/photo-1544025162-d76694265947?w=700&auto=format&fit=crop&q=80" 
//                 alt="Delicious Gourmet Dish" 
//                 className="w-full h-full object-cover"
//               />
//             </motion.div>

//             {/* Quick Promo Floating Card */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="absolute -bottom-4 left-4 bg-white p-4 rounded-2xl shadow-xl border border-pink-50 flex items-center gap-3 backdrop-blur-sm bg-white/95"
//             >
//               <div className="p-2.5 bg-green-50 rounded-xl">
//                 <Truck className="w-5 h-5 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-xs font-bold text-gray-800">Free Delivery</p>
//                 <p className="text-[10px] text-gray-400 font-semibold">For orders over $50</p>
//               </div>
//             </motion.div>

//             {/* Chef's Special Badge */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="absolute -top-4 right-4 bg-white p-4 rounded-2xl shadow-xl border border-pink-50 flex items-center gap-3 backdrop-blur-sm bg-white/95"
//             >
//               <div className="p-2.5 bg-orange-50 rounded-xl">
//                 <Utensils className="w-5 h-5 text-orange-500" />
//               </div>
//               <div>
//                 <p className="text-xs font-bold text-gray-800">Chef Sarah Special</p>
//                 <p className="text-[10px] text-orange-500 font-bold flex items-center gap-0.5">
//                   <Star className="w-3 h-3 fill-orange-400 text-orange-400" /> 4.9 Rating
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* 2. Popular Categories */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center flex flex-col gap-3 mb-12">
//           <span className="text-xs font-bold uppercase tracking-wider text-[#FF4D6D]">Food Explorer</span>
//           <h2 className="text-3xl font-black text-gray-800 tracking-tight">Browse Popular Categories</h2>
//           <div className="w-12 h-1 bg-[#FF4D6D] mx-auto rounded-full mt-1"></div>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
//           {categories.map((cat, idx) => (
//             <motion.div
//               key={idx}
//               whileHover={{ y: -5, scale: 1.03 }}
//               transition={{ duration: 0.2 }}
//               className="bg-white border border-gray-100 rounded-2xl p-5 text-center flex flex-col items-center gap-3 shadow-sm hover:shadow-lg transition-all cursor-pointer"
//             >
//               <div className="text-4xl p-3 bg-[#FFF7F8] rounded-2xl">{cat.icon}</div>
//               <div>
//                 <h4 className="text-xs font-extrabold text-gray-800">{cat.name}</h4>
//                 <p className="text-[10px] font-semibold text-gray-400 mt-1">{cat.count}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* 3. Featured Meals */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col sm:flex-row items-end justify-between mb-12 gap-4">
//           <div className="flex flex-col gap-3">
//             <span className="text-xs font-bold uppercase tracking-wider text-[#FF9F1C]">Recommended Meals</span>
//             <h2 className="text-3xl font-black text-gray-800 tracking-tight">Weekly Chef Specials</h2>
//             <div className="w-12 h-1 bg-[#FF9F1C] rounded-full mt-1"></div>
//           </div>
//           <Link to="/menu">
//             <AnimatedButton variant="secondary" className="px-5 py-2.5 text-xs !rounded-xl">
//               View Complete Menu
//               <ArrowRight className="w-3.5 h-3.5" />
//             </AnimatedButton>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {loading ? (
//             <SkeletonLoader type="card" count={3} />
//           ) : (
//             featuredMeals.map((meal, index) => (
//               <AnimatedCard key={meal.id} index={index} className="flex flex-col h-full overflow-hidden">
//                 <div className="h-48 overflow-hidden relative">
//                   <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
//                   <span className="absolute top-3 left-3 bg-[#FFF7F8] text-[#FF4D6D] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-pink-100 shadow-sm">
//                     {meal.category}
//                   </span>
//                   {meal.spicy && (
//                     <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase">
//                       Spicy 🔥
//                     </span>
//                   )}
//                 </div>
//                 <div className="p-5 flex-1 flex flex-col justify-between gap-4">
//                   <div className="flex flex-col gap-1.5">
//                     <div className="flex justify-between items-center">
//                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#FF9F1C] font-black text-lg">
//                         ${meal.price.toFixed(2)}
//                       </span>
//                       <span className="text-[10px] font-bold text-gray-400 flex items-center gap-0.5">
//                         <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
//                         {meal.rating} ({meal.reviews})
//                       </span>
//                     </div>
//                     <h3 className="font-extrabold text-sm text-gray-800 line-clamp-1">{meal.name}</h3>
//                     <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{meal.description}</p>
//                   </div>

//                   <div className="flex items-center gap-2 mt-2">
//                     <Link to={`/menu/${meal.id}`} className="flex-1">
//                       <button className="w-full py-2.5 bg-gray-50 border border-gray-100 text-gray-600 rounded-xl font-bold text-xs hover:bg-[#FFF7F8] hover:text-[#FF4D6D] transition-all">
//                         View Details
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </AnimatedCard>
//             ))
//           )}
//         </div>
//       </section>

//       {/* 4. Why Choose Us */}
//       <section className="bg-gradient-to-b from-[#FFF7F8] to-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
//           <div className="flex flex-col items-center text-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-pink-50">
//             <div className="p-4 bg-rose-50 text-[#FF4D6D] rounded-full">
//               <Utensils className="w-8 h-8" />
//             </div>
//             <h3 className="text-base font-extrabold text-gray-800">100% Quality Foods</h3>
//             <p className="text-xs text-gray-400 leading-relaxed">
//               We source organic vegetables and premium meats. Our professional chefs follow strict hygiene rules to create delicious, high-grade culinary masterpieces.
//             </p>
//           </div>

//           <div className="flex flex-col items-center text-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-pink-50">
//             <div className="p-4 bg-purple-50 text-[#7B61FF] rounded-full">
//               <Truck className="w-8 h-8" />
//             </div>
//             <h3 className="text-base font-extrabold text-gray-800">Lightning-Fast Delivery</h3>
//             <p className="text-xs text-gray-400 leading-relaxed">
//               Our smart routing and dedicated riders ensure your food leaves the kitchen and lands on your table warm, fresh, and on schedule.
//             </p>
//           </div>

//           <div className="flex flex-col items-center text-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-pink-50">
//             <div className="p-4 bg-green-50 text-[#16A34A] rounded-full">
//               <ShieldCheck className="w-8 h-8" />
//             </div>
//             <h3 className="text-base font-extrabold text-gray-800">Secure Payments</h3>
//             <p className="text-xs text-gray-400 leading-relaxed">
//               Shop with confidence. We protect your billing detail using PCI-compliant payment integrations or flexible cash-on-delivery options.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* 5. Customer Testimonials */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center flex flex-col gap-3 mb-12">
//           <span className="text-xs font-bold uppercase tracking-wider text-[#7B61FF]">Happy Customers</span>
//           <h2 className="text-3xl font-black text-gray-800 tracking-tight">What Our Diners Say</h2>
//           <div className="w-12 h-1 bg-[#7B61FF] mx-auto rounded-full mt-1"></div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((test) => (
//             <div 
//               key={test.id} 
//               className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow duration-300"
//             >
//               <p className="text-xs text-gray-500 italic leading-relaxed">"{test.comment}"</p>
              
//               <div className="flex items-center gap-4">
//                 <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover border-2 border-pink-50 shrink-0" />
//                 <div>
//                   <h4 className="text-xs font-bold text-gray-800">{test.name}</h4>
//                   <p className="text-[10px] text-gray-400 font-semibold">{test.role}</p>
//                   <div className="flex items-center gap-0.5 mt-1">
//                     {Array.from({ length: test.rating }).map((_, i) => (
//                       <Star key={i} className="w-3 h-3 fill-orange-400 text-orange-400" />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 6. Download App placeholder */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-gradient-to-r from-[#FF4D6D] to-[#FF9F1C] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
//           <div className="flex flex-col gap-4 max-w-lg">
//             <span className="self-start px-3 py-1 bg-white/20 rounded-full text-[10px] font-extrabold uppercase tracking-widest">Mobile App</span>
//             <h2 className="text-2xl sm:text-3xl font-black leading-tight">Order On The Go! Download EateryApp Mobile</h2>
//             <p className="text-xs text-pink-50 leading-relaxed">
//               Get access to exclusive mobile coupons, real-time push notifications of order status, and speedier checkouts.
//             </p>
//             <div className="flex gap-4 mt-2">
//               <button className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-pink-50 transition-colors shadow flex items-center gap-2">
//                 🍏 App Store
//               </button>
//               <button className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-pink-50 transition-colors shadow flex items-center gap-2">
//                 🤖 Google Play
//               </button>
//             </div>
//           </div>
//           <div className="w-64 h-64 overflow-hidden rounded-2xl border border-white/20 shadow-inner hidden lg:block">
//             <img 
//               src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop&q=80" 
//               alt="App Mockup" 
//               className="w-full h-full object-cover" 
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
