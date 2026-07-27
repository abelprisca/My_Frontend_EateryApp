//create an about page that has a header banner, a visual content split, a number stats grid, and a team members section
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Users, Heart } from 'lucide-react';

export const About = () => {
  const stats = [
    { label: 'Culinary Awards', value: '12+' },
    { label: 'Daily Delivery', value: '1,500+' },
    { label: 'Verified Chefs', value: '35+' },
    { label: 'Happy Customers', value: '98%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">
      {/* 1. Header Banner */}
      <section className="text-center flex flex-col gap-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF4D6D]">Our Journey</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Redefining the Dining Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#FF9F1C]">At Your Table</span>
        </h1>
        <div className="w-12 h-1 bg-[#FF4D6D] mx-auto rounded-full mt-1"></div>
        <p className="text-sm text-gray-500 leading-relaxed mt-2">
          EateryApp started with a simple vision: to make high-end culinary restaurant dining accessible, comfortable, and affordable for everyone, everywhere.
        </p>
      </section>

      {/* 2. Visual Content split */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-xl border border-pink-100">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80" 
            alt="Chef Cooking in Kitchen" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-gray-800">Fresh Ingredients, Expert Cooking</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Every dish we prepare is a labor of love. We partner directly with local farms to acquire the freshest ingredients, organic spices, and premium grade meats. 
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Our kitchen runs under the direction of world-class, award-winning executive chefs who combine traditional techniques with modern culinary trends to produce unforgettable flavors.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-pink-50 text-[#FF4D6D] rounded-xl shrink-0 mt-0.5">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-gray-800">Global Cuisine</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Diverse recipes spanning local and continental delicacies.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-50 text-[#16A34A] rounded-xl shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-gray-800">Health First</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Nutritionally balanced meals cooked with low-sodium and low-cholesterol oils.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Number Stats Grid */}
      <section className="bg-gradient-to-r from-[#FF4D6D] to-[#E63956] rounded-3xl p-8 text-white grid grid-cols-2 lg:grid-cols-4 gap-6 text-center shadow-lg">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <h3 className="text-3xl sm:text-4xl font-black">{stat.value}</h3>
            <p className="text-xs text-pink-100 font-semibold uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* 4. Team Members */}
      <section className="flex flex-col gap-10">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-2xl font-black text-gray-800">Meet Our Chefs</h2>
          <p className="text-xs text-gray-400">The masterminds behind our mouth-watering recipes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Sarah Jenkins', role: 'Executive Pastry Chef', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80' },
            { name: 'Marcus Chen', role: 'Head Chef de Cuisine', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&auto=format&fit=crop&q=80' },
            { name: 'Elena Rostova', role: 'Sauce Specialist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80' },
            { name: 'David Kalu', role: 'Grill Master', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
          ].map((chef, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center gap-3"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-pink-100">
                <img src={chef.image} alt={chef.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">{chef.name}</h4>
                <p className="text-[10px] text-gray-400 font-semibold">{chef.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
