import React from 'react'

function Menu() {
  return (
    <div>Menu</div>
  )
}

export default Menu

// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import useCart from '../hooks/useCart';
// import useAuth from '../hooks/useAuth';
// import apiClient, { mockApi } from '../services/api';
// import { Search, Star, Heart, ShoppingCart, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import AnimatedCard from '../components/ui/AnimatedCard';
// import SkeletonLoader from '../components/ui/SkeletonLoader';
// import EmptyState from '../components/ui/EmptyState';

// export const Menu = () => {
//   const { addToCart } = useCart();
//   const { isAuthenticated } = useAuth();
  
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [maxPrice, setMaxPrice] = useState(25);
//   const [sortBy, setSortBy] = useState('popularity'); // popularity, price_asc, price_desc, name
  
//   // Favorites list saved in local storage
//   const [favorites, setFavorites] = useState(() => {
//     const saved = localStorage.getItem('eatery_favorites');
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         /*
//         // ====================================================
//         // PRODUCTION API CALL (AXIOS INTEGRATION)
//         // ====================================================
//         // To use your live backend, uncomment the code below:
//         //
//         // const response = await apiClient.get('/meals');
//         // setMeals(response.data);
//         // ====================================================
//         */

//         const data = await mockApi.meals.getAll();
//         setMeals(data);
//       } catch (err) {
//         console.error('Failed to load menu:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMenu();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('eatery_favorites', JSON.stringify(favorites));
//   }, [favorites]);

//   const toggleFavorite = (mealId) => {
//     setFavorites(prev => {
//       if (prev.includes(mealId)) {
//         return prev.filter(id => id !== mealId);
//       } else {
//         return [...prev, mealId];
//       }
//     });
//   };

//   // Categories list extracted from meals
//   const categories = ['All', ...new Set(meals.map(m => m.category))];

//   // Filtering Logic
//   const filteredMeals = meals.filter(meal => {
//     const matchesSearch = 
//       meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       meal.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    
//     const matchesCategory = selectedCategory === 'All' || meal.category === selectedCategory;
//     const matchesPrice = meal.price <= maxPrice;

//     return matchesSearch && matchesCategory && matchesPrice;
//   });

//   // Sorting Logic
//   const sortedMeals = [...filteredMeals].sort((a, b) => {
//     if (sortBy === 'popularity') return b.rating - a.rating;
//     if (sortBy === 'price_asc') return a.price - b.price;
//     if (sortBy === 'price_desc') return b.price - a.price;
//     if (sortBy === 'name') return a.name.localeCompare(b.name);
//     return 0;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
//       {/* Page Header */}
//       <div className="text-center flex flex-col gap-3">
//         <span className="text-xs font-bold uppercase tracking-wider text-[#FF4D6D]">Fresh & Delicious</span>
//         <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Explore Our Premium Menu</h1>
//         <div className="w-12 h-1 bg-[#FF4D6D] mx-auto rounded-full"></div>
//       </div>

//       {/* Search and Filters Controls */}
//       <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-5">
//         {/* Search Bar */}
//         <div className="relative w-full">
//           <Search className="absolute inset-y-0 left-4 my-auto w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search for meals (e.g. Jollof, Chicken, Spicy, Pasta...)"
//             className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-150 rounded-2xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#FF4D6D] transition-all"
//           />
//         </div>

//         {/* Filters and Sorting Row */}
//         <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5">
//           {/* Categories Tab list */}
//           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 type="button"
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-4.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
//                   selectedCategory === cat
//                     ? 'bg-[#FF4D6D] text-white shadow-md'
//                     : 'bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-[#FF4D6D]'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* Price & Sort inputs */}
//           <div className="flex flex-wrap items-center gap-4">
//             {/* Price range filter */}
//             <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-150">
//               <SlidersHorizontal className="w-4 h-4 text-gray-400" />
//               <div className="flex flex-col">
//                 <span className="text-[9px] font-bold text-gray-400 uppercase">Max Price</span>
//                 <span className="text-xs font-extrabold text-gray-700">${maxPrice}</span>
//               </div>
//               <input
//                 type="range"
//                 min="5"
//                 max="30"
//                 step="1"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(Number(e.target.value))}
//                 className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF4D6D]"
//               />
//             </div>

//             {/* Sorting */}
//             <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-150">
//               <ArrowUpDown className="w-4 h-4 text-gray-400" />
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="bg-transparent text-xs font-bold text-gray-600 focus:outline-none cursor-pointer"
//               >
//                 <option value="popularity">Popularity</option>
//                 <option value="price_asc">Price: Low to High</option>
//                 <option value="price_desc">Price: High to Low</option>
//                 <option value="name">Meal Name</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Meals Grid */}
//       <section className="min-h-[40vh]">
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             <SkeletonLoader type="card" count={4} />
//           </div>
//         ) : sortedMeals.length === 0 ? (
//           <EmptyState 
//             type="search" 
//             title="No Meals Match Filters" 
//             message="Adjust your keyword filters, category choice, or increase the price limit."
//             actionText="Clear Filters"
//             actionLink={null}
//             // Trigger clear filters manually
//             actionOnClick={() => {
//               setSearchQuery('');
//               setSelectedCategory('All');
//               setMaxPrice(25);
//               setSortBy('popularity');
//             }}
//           />
//         ) : (
//           <motion.div 
//             layout
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             <AnimatePresence mode="popLayout">
//               {sortedMeals.map((meal, index) => {
//                 const isFav = favorites.includes(meal.id);
//                 return (
//                   <AnimatedCard key={meal.id} index={index} className="flex flex-col justify-between h-full overflow-hidden relative">
//                     {/* Image Area */}
//                     <div className="h-44 overflow-hidden relative group">
//                       <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      
//                       {/* Favorite Button */}
//                       <button
//                         onClick={() => toggleFavorite(meal.id)}
//                         className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-gray-700 hover:text-[#FF4D6D] rounded-full shadow-sm backdrop-blur-xs transition-colors"
//                       >
//                         <Heart className={`w-4 h-4 transition-all ${isFav ? 'fill-[#FF4D6D] text-[#FF4D6D]' : ''}`} />
//                       </button>

//                       {/* Category Badge */}
//                       <span className="absolute bottom-3 left-3 bg-white text-gray-800 text-[9px] font-black uppercase px-2.5 py-1 rounded-full border border-pink-50 shadow-sm">
//                         {meal.category}
//                       </span>
//                     </div>

//                     {/* Content Area */}
//                     <div className="p-4 flex-1 flex flex-col justify-between gap-3">
//                       <div className="flex flex-col gap-1">
//                         <div className="flex justify-between items-center">
//                           <span className="text-[#FF4D6D] font-black text-base">
//                             ${meal.price.toFixed(2)}
//                           </span>
//                           <span className="text-[9px] font-bold text-gray-400 flex items-center gap-0.5">
//                             <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
//                             {meal.rating} ({meal.reviews})
//                           </span>
//                         </div>
//                         <h3 className="font-extrabold text-xs text-gray-800 line-clamp-1">{meal.name}</h3>
//                         <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">{meal.description}</p>
//                       </div>

//                       {/* Availability & Actions */}
//                       <div className="flex items-center justify-between gap-3 mt-1.5">
//                         <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
//                           meal.available ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
//                         }`}>
//                           {meal.available ? 'In Stock' : 'Out of Stock'}
//                         </span>

//                         <div className="flex gap-2">
//                           <Link to={`/menu/${meal.id}`}>
//                             <button className="px-3 py-2 bg-gray-50 border border-gray-100 hover:bg-[#FFF7F8] hover:text-[#FF4D6D] text-gray-500 rounded-xl font-bold text-[10px] transition-colors">
//                               Details
//                             </button>
//                           </Link>
//                           <button
//                             onClick={() => addToCart(meal)}
//                             disabled={!meal.available}
//                             className={`p-2 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
//                             title="Add to Cart"
//                           >
//                             <ShoppingCart className="w-3.5 h-3.5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </AnimatedCard>
//                 );
//               })}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Menu;
