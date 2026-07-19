
import React from 'react'

function MealDetails() {
  return (
    <div>MealDetails</div>
  )
}

export default MealDetails

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import useCart from '../hooks/useCart';
// import { Star, Heart, ShoppingCart, ArrowLeft, Plus, Minus, Tag, CheckCircle2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import SkeletonLoader from '../components/ui/SkeletonLoader';
// import AnimatedCard from '../components/ui/AnimatedCard';

// export const MealDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
  
//   const [meal, setMeal] = useState(null);
//   const [relatedMeals, setRelatedMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [isFav, setIsFav] = useState(false);
//   const [activeImageIdx, setActiveImageIdx] = useState(0);

//   // Setup gallery images (since we only have 1 main image in mock data, we will duplicate or mix some food pictures for high fidelity UI)
//   const [gallery, setGallery] = useState([]);

//   useEffect(() => {
//     const fetchMealData = async () => {
//       setLoading(true);
//       try {
//         /*
//         // ====================================================
//         // PRODUCTION API CALL (AXIOS INTEGRATION)
//         // ====================================================
//         // To use your live backend, uncomment the code below:
//         //
//         // const response = await apiClient.get(`/meals/${id}`);
//         // const item = response.data;
//         // setMeal(item);
//         // ====================================================
//         */

//         const item = await mockApi.meals.getById(id);
//         setMeal(item);
        
//         // Mock Gallery: Combine the main image with 2 general beautiful food images for demonstration
//         setGallery([
//           item.image,
//           'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
//           'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
//         ]);
//         setActiveImageIdx(0);
//         setQuantity(1);

//         // Check if favorite
//         const savedFavs = JSON.parse(localStorage.getItem('eatery_favorites') || '[]');
//         setIsFav(savedFavs.includes(item.id));

//         // Fetch related meals (same category, excluding current)
//         const allMeals = await mockApi.meals.getAll();
//         const related = allMeals
//           .filter(m => m.category === item.category && m.id !== item.id)
//           .slice(0, 3);
//         setRelatedMeals(related);
//       } catch (err) {
//         console.error('Error fetching meal details:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMealData();
//   }, [id]);

//   const toggleFavorite = () => {
//     const savedFavs = JSON.parse(localStorage.getItem('eatery_favorites') || '[]');
//     let updated;
//     if (isFav) {
//       updated = savedFavs.filter(mid => mid !== meal.id);
//       setIsFav(false);
//     } else {
//       updated = [...savedFavs, meal.id];
//       setIsFav(true);
//     }
//     localStorage.setItem('eatery_favorites', JSON.stringify(updated));
//   };

//   const handleAdd = () => {
//     if (meal) {
//       addToCart(meal, quantity);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <SkeletonLoader type="card" count={1} />
//       </div>
//     );
//   }

//   if (!meal) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center gap-4">
//         <h2 className="text-xl font-bold text-gray-800">Meal Not Found</h2>
//         <p className="text-sm text-gray-500">The dish you are looking for might have been removed from the menu.</p>
//         <Link to="/menu">
//           <button className="px-5 py-2.5 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white rounded-xl font-bold text-xs">
//             Back to Menu
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">
//       {/* Back navigation */}
//       <button 
//         onClick={() => navigate(-1)}
//         className="self-start flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#FF4D6D] transition-colors"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Back
//       </button>

//       {/* Main Details Section */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Left Column: Image Gallery */}
//         <div className="flex flex-col gap-4">
//           <div className="aspect-video sm:aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative">
//             <img src={gallery[activeImageIdx]} alt={meal.name} className="w-full h-full object-cover" />
            
//             {meal.spicy && (
//               <span className="absolute top-4 left-4 bg-red-500 text-white font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow">
//                 Spicy 🔥
//               </span>
//             )}
//           </div>

//           {/* Thumbnails row */}
//           <div className="flex gap-3 justify-center">
//             {gallery.map((img, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setActiveImageIdx(idx)}
//                 className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
//                   activeImageIdx === idx ? 'border-[#FF4D6D] scale-102 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
//                 }`}
//               >
//                 <img src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Right Column: Descriptions & Actions */}
//         <div className="flex flex-col justify-between gap-6">
//           <div className="flex flex-col gap-4">
//             {/* Category Badge & Favorite */}
//             <div className="flex justify-between items-center">
//               <span className="text-xs font-black uppercase text-[#FF4D6D] bg-[#FFE5E9] px-3.5 py-1 rounded-full border border-pink-100 flex items-center gap-1">
//                 <Tag className="w-3.5 h-3.5" />
//                 {meal.category}
//               </span>
//               <button
//                 onClick={toggleFavorite}
//                 className="p-2.5 bg-white border border-gray-150 hover:bg-[#FFF7F8] rounded-full shadow-sm text-gray-500 hover:text-[#FF4D6D] transition-all"
//               >
//                 <Heart className={`w-5 h-5 ${isFav ? 'fill-[#FF4D6D] text-[#FF4D6D]' : ''}`} />
//               </button>
//             </div>

//             {/* Title & Rating */}
//             <div className="flex flex-col gap-1.5">
//               <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">{meal.name}</h1>
//               <div className="flex items-center gap-3">
//                 <span className="text-sm font-black text-gray-800 flex items-center gap-0.5">
//                   <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
//                   {meal.rating}
//                 </span>
//                 <span className="text-xs font-semibold text-gray-400">({meal.reviews} customer reviews)</span>
//               </div>
//             </div>

//             {/* Price */}
//             <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#FF9F1C] self-start">
//               ${meal.price.toFixed(2)}
//             </h2>

//             {/* Description */}
//             <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{meal.description}</p>

//             {/* Ingredients list */}
//             <div className="flex flex-col gap-2 mt-2">
//               <h4 className="text-xs font-bold text-gray-800">Ingredients</h4>
//               <div className="flex flex-wrap gap-2">
//                 {meal.ingredients.map((ing, i) => (
//                   <span key={i} className="text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-150 px-3 py-1 rounded-xl flex items-center gap-1">
//                     <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
//                     {ing}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Action Row */}
//           <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 mt-4">
//             <div className="flex items-center justify-between gap-4">
//               <span className="text-xs font-bold text-gray-600">Select Quantity</span>
              
//               {/* Quantity Changer */}
//               <div className="flex items-center bg-gray-50 border border-gray-150 rounded-xl overflow-hidden">
//                 <button
//                   type="button"
//                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                   className="p-3 text-gray-500 hover:bg-gray-100 transition-colors"
//                 >
//                   <Minus className="w-3.5 h-3.5" />
//                 </button>
//                 <span className="px-4 text-sm font-extrabold text-gray-800 w-10 text-center select-none">
//                   {quantity}
//                 </span>
//                 <button
//                   type="button"
//                   onClick={() => setQuantity(q => q + 1)}
//                   className="p-3 text-gray-500 hover:bg-gray-100 transition-colors"
//                 >
//                   <Plus className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             </div>

//             <button
//               onClick={handleAdd}
//               disabled={!meal.available}
//               className="w-full py-3.5 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
//             >
//               <ShoppingCart className="w-4 h-4" />
//               Add {quantity} Item{quantity > 1 ? 's' : ''} to Cart • ${(meal.price * quantity).toFixed(2)}
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Related Meals Section */}
//       {relatedMeals.length > 0 && (
//         <section className="flex flex-col gap-6">
//           <div className="flex flex-col gap-1 border-b border-gray-100 pb-3">
//             <h2 className="text-lg font-black text-gray-800">You Might Also Like</h2>
//             <p className="text-xs text-gray-400">Other gourmet dishes in our {meal.category} section.</p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             {relatedMeals.map((item, index) => (
//               <AnimatedCard key={item.id} index={index} className="flex flex-col justify-between overflow-hidden h-full">
//                 <div className="h-36 overflow-hidden relative">
//                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                 </div>
//                 <div className="p-4 flex-1 flex flex-col justify-between gap-3">
//                   <div>
//                     <h4 className="font-extrabold text-xs text-gray-800 truncate">{item.name}</h4>
//                     <span className="text-[#FF4D6D] font-black text-xs mt-1 block">${item.price.toFixed(2)}</span>
//                   </div>
//                   <Link to={`/menu/${item.id}`}>
//                     <button className="w-full py-2 bg-gray-50 border border-gray-100 text-gray-500 hover:bg-[#FFF7F8] hover:text-[#FF4D6D] rounded-xl font-bold text-[10px] transition-colors">
//                       View Details
//                     </button>
//                   </Link>
//                 </div>
//               </AnimatedCard>
//             ))}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default MealDetails;
