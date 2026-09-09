import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Users, Heart, Sparkles, ShieldCheck, Flame, Utensils } from 'lucide-react';

export const About = () => {
  const stats = [
    { label: 'Culinary Awards', value: '15+', icon: Award },
    { label: 'Daily Fresh Meals', value: '2,400+', icon: Flame },
    { label: 'Master Chefs', value: '40+', icon: Utensils },
    { label: 'Satisfaction Rate', value: '99.4%', icon: Heart },
  ];

  const chefs = [
    {
      name: 'Chef Sarah Jenkins',
      role: 'Executive Pastry & Dessert Specialist',
      image: '/chef-1.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
      bio: 'Master in artisanal baking, French pastries, and handcrafted desserts.',
      experience: '12 Years Exp.'
    },
    {
      name: 'Chef Marcus Chen',
      role: 'Head Chef de Cuisine & Asian Fusion',
      image: '/chef-2.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=80',
      bio: 'Pioneer of high-heat wok techniques, gourmet stocks, and rich umami profiles.',
      experience: '15 Years Exp.'
    },
    {
      name: 'Chef Elena Rostova',
      role: 'Continental & Sauce Specialist',
      image: '/chef-3.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
      bio: 'Classically trained in Mediterranean reduction sauces and organic seasoning.',
      experience: '10 Years Exp.'
    },
    {
      name: 'Chef David Kalu',
      role: 'Master Grill & African Delicacies',
      image: '/chef-4.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
      bio: 'Expert in open-flame grills, authentic native spices, and premium roasts.',
      experience: '14 Years Exp.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7F8] via-white to-[#FFF7F8]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-pink-300/30 to-orange-300/30 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-5 left-5 w-80 h-80 bg-gradient-to-tr from-red-200/30 to-pink-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="text-center flex flex-col items-center gap-5 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/80 text-[#FF4D6D] text-xs font-black uppercase tracking-widest shadow-sm"
          >
            <Sparkles size={16} />
            Our Culinary Legacy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight"
          >
            Crafting Unforgettable Dining Experiences{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] via-rose-500 to-[#FF9F1C]">
              At Your Fingertips
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium"
          >
            Welcome to EateryApp — where passion meets precision. We bring restaurant-grade gastronomy, organic farm-fresh ingredients, and world-class culinary expertise directly to your doorstep.
          </motion.p>
        </div>
      </section>

      {/* 2. STATS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#FF4D6D] via-red-500 to-[#FF9F1C] rounded-3xl p-8 sm:p-12 text-white shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-8 relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center gap-2 relative z-10">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-1">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight">{stat.value}</h3>
                <p className="text-xs text-pink-100 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* 3. VISUAL STORY SPLIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/chef-executive.jpg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80";
                }}
                alt="Executive Chef Cooking"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-pink-100 hidden sm:flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-[#FF4D6D]">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900">100% Certified Hygiene</h4>
                <p className="text-xs text-gray-500 font-medium">Strict sanitation standards</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#FF4D6D]">Our Standard</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              Fresh Ingredients, Time-Honored Recipes & Pure Perfection
            </h2>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Every meal at EateryApp starts with organic, ethically sourced ingredients from local farms. We believe great food is built on integrity, freshness, and authentic spices.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-pink-100 shadow-sm flex items-start gap-3">
                <div className="p-2.5 bg-pink-50 text-[#FF4D6D] rounded-xl shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900">Global & Native Recipes</h4>
                  <p className="text-xs text-gray-500 mt-1">Carefully crafted continental and traditional meals.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-pink-100 shadow-sm flex items-start gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900">Health & Wellness First</h4>
                  <p className="text-xs text-gray-500 mt-1">Balanced nutrition using healthy oils and low sodium.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. MEET OUR CHEFS (PUBLIC IMAGE INTEGRATION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="text-center flex flex-col items-center gap-3 mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF4D6D]">Master Culinary Team</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">Meet Our Executive Chefs</h2>
          <p className="text-gray-500 max-w-xl text-sm sm:text-base font-medium">
            You can update chef photos directly anytime from your project’s <code className="bg-gray-100 px-2 py-1 rounded text-[#FF4D6D] font-bold text-xs">/public</code> folder!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl border border-gray-150 p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                {chef.experience}
              </div>

              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-pink-100 group-hover:border-[#FF4D6D] transition-colors duration-300 mb-5 shadow-md">
                <img
                  src={chef.image}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = chef.fallbackImage;
                  }}
                  alt={chef.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="text-lg font-black text-gray-900 group-hover:text-[#FF4D6D] transition-colors">
                {chef.name}
              </h3>
              <p className="text-xs font-bold text-orange-500 mt-1 mb-3">{chef.role}</p>

              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                {chef.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
