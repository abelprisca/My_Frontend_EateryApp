import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  CheckCircle,
  XCircle,
  Tag,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import API from "../services/api";
import useCart from "../hooks/useCart";

function MealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [meal, setMeal] = useState(null);
  const [relatedMeals, setRelatedMeals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);

  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [adding, setAdding] = useState(false);

  const [imageError, setImageError] = useState(false);

  // =====================================
  // FETCH MEAL
  // =====================================

  const fetchMeal = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(`/menu/${id}`);

      const mealData = response.data.data.menuItem;

      if (!mealData) {
        setError("Meal not found.");
        return;
      }

      setMeal(mealData);

      fetchRelatedMeals(mealData.category, mealData._id);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 404) {
        setError("Meal not found.");
      } else {
        setError("Unable to load this meal.");
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // FETCH RELATED
  // =====================================

  const fetchRelatedMeals = async (category, mealId) => {
    try {
      setLoadingRelated(true);

      const response = await API.get("/menu");

      const meals = response.data.data.menuItems;

      const related = meals
        .filter(
          (item) =>
            item.category === category &&
            item._id !== mealId
        )
        .slice(0, 3);

      setRelatedMeals(related);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingRelated(false);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, [id]);

  // =====================================
  // QUANTITY
  // =====================================

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // =====================================
  // ADD TO CART
  // =====================================

  const handleAddToCart = async () => {
    if (!meal) return;

    if (!meal.isAvailable) {
      toast.error("This meal is unavailable.");
      return;
    }

    try {
      setAdding(true);

      addToCart({
        ...meal,
        quantity,
      });

      toast.success("Added to cart successfully!");
    } catch (err) {
      console.log(err);

      toast.error("Unable to add item to cart.");
    } finally {
      setAdding(false);
    }
  };

  // =====================================
  // LOADING STATE
  // =====================================

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-16">

        <div className="animate-pulse">

          <div className="h-12 w-48 bg-gray-200 rounded mb-10"></div>

          <div className="grid lg:grid-cols-2 gap-12">

            <div className="h-[550px] rounded-3xl bg-gray-200"></div>

            <div>

              <div className="h-10 bg-gray-200 rounded w-72 mb-6"></div>

              <div className="h-5 bg-gray-200 rounded w-full mb-4"></div>

              <div className="h-5 bg-gray-200 rounded w-5/6 mb-4"></div>

              <div className="h-5 bg-gray-200 rounded w-3/4 mb-8"></div>

              <div className="h-16 w-40 bg-gray-200 rounded mb-8"></div>

              <div className="h-14 bg-gray-200 rounded"></div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =====================================
  // ERROR STATE
  // =====================================

  if (error) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">

        <div className="text-center">

          <XCircle
            size={70}
            className="mx-auto text-red-500 mb-5"
          />

          <h2 className="text-3xl font-black text-gray-800">
            {error}
          </h2>

          <p className="text-gray-500 mt-4">
            Please check your internet connection
            or try again.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            <button
              onClick={fetchMeal}
              className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-rose-500
              hover:bg-rose-600
              text-white
              font-bold
              transition
              "
            >
              <RefreshCw size={18} />
              Retry
            </button>

            <button
              onClick={() => navigate("/menu")}
              className="
              px-6
              py-3
              rounded-xl
              border
              border-rose-500
              text-rose-500
              hover:bg-rose-500
              hover:text-white
              transition
              "
            >
              Back to Menu
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =====================================
  // MAIN UI
  // =====================================

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">

      {/* Back Button */}

      <button
        onClick={() => navigate("/menu")}
        className="
        flex
        items-center
        gap-2
        mb-8
        text-gray-600
        hover:text-rose-500
        transition
        font-semibold
        "
      >
        <ArrowLeft size={20} />
        Back to Menu
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid lg:grid-cols-2 gap-14 items-center"
      >

        {/* =====================================
              IMAGE
        ===================================== */}

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="
          bg-white
          rounded-[35px]
          shadow-2xl
          overflow-hidden
          border
          border-gray-100
          "
        >

          <img
            src={
              imageError || !meal.image
                ? "/default-food.jpg"
                : `http://localhost:5000${meal.image}`
            }
            onError={() => setImageError(true)}
            alt={meal.name}
            className="
            w-full
            h-[550px]
            object-contain
            bg-gradient-to-br
            from-orange-50
            to-white
            p-6
            transition
            duration-500
            hover:scale-105
            "
          />

        </motion.div>

        {/* =====================================
              DETAILS
        ===================================== */}

        <div>

          <div className="flex flex-wrap gap-3 mb-5">

            <span
              className="
              bg-rose-100
              text-rose-600
              px-4
              py-2
              rounded-full
              text-sm
              font-bold
              "
            >
              {meal.category}
            </span>

            {meal.isAvailable ? (

              <span
                className="
                flex
                items-center
                gap-2
                bg-green-100
                text-green-700
                px-4
                py-2
                rounded-full
                text-sm
                font-bold
                "
              >
                <CheckCircle size={16} />
                Available
              </span>

            ) : (

              <span
                className="
                flex
                items-center
                gap-2
                bg-red-100
                text-red-600
                px-4
                py-2
                rounded-full
                text-sm
                font-bold
                "
              >
                <XCircle size={16} />
                Unavailable
              </span>

            )}

          </div>

          <h1
            className="
            text-5xl
            font-black
            text-gray-900
            leading-tight
            "
          >
            {meal.name}
          </h1>

          <div className="flex items-center gap-2 mt-5">

            {[1,2,3,4,5].map((item)=>(
              <Star
                key={item}
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}

            <span className="text-gray-500 text-sm">
              Customer Favourite
            </span>

          </div>

          <p
            className="
            mt-8
            text-gray-600
            text-lg
            leading-8
            "
          >
            {meal.description}
          </p>

          {/* Dietary */}

          {meal.isDietary?.length > 0 && (

            <div className="mt-8">

              <h3 className="font-bold text-gray-800 mb-3">
                Dietary Information
              </h3>

              <div className="flex flex-wrap gap-3">

                {meal.isDietary.map((diet,index)=>(

                  <span
                    key={index}
                    className="
                    flex
                    items-center
                    gap-2
                    bg-emerald-100
                    text-emerald-700
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                    "
                  >
                    <Tag size={15} />
                    {diet}
                  </span>

                ))}

              </div>

            </div>

          )}

          {/* Price */}

          <div className="mt-10">

            <span className="text-gray-500 text-sm">
              Price
            </span>

            <h2
              className="
              text-5xl
              font-black
              text-rose-500
              "
            >
              ₦{meal.price.toLocaleString()}
            </h2>

          </div>

          {/* Quantity */}

          <div className="mt-10 flex items-center gap-6">

            <div
              className="
              flex
              items-center
              rounded-2xl
              bg-gray-100
              overflow-hidden
              "
            >

              <button
                onClick={decrease}
                className="
                p-4
                hover:bg-gray-200
                transition
                "
              >
                <Minus />
              </button>

              <span
                className="
                px-8
                text-xl
                font-bold
                "
              >
                {quantity}
              </span>

              <button
                onClick={increase}
                className="
                p-4
                hover:bg-gray-200
                transition
                "
              >
                <Plus />
              </button>

            </div>

            <button
              onClick={handleAddToCart}
              disabled={!meal.isAvailable || adding}
              className="
              flex-1
              flex
              items-center
              justify-center
              gap-3
              bg-gradient-to-r
              from-rose-500
              via-pink-500
              to-orange-500
              hover:shadow-2xl
              hover:scale-[1.02]
              transition-all
              duration-300
              text-white
              py-4
              rounded-2xl
              font-bold
              disabled:opacity-50
              disabled:cursor-not-allowed
              "
            >

              <ShoppingCart size={20} />

              {adding ? "Adding..." : "Add To Cart"}

            </button>

          </div>

          {/* Highlights */}

          <div
            className="
            mt-12
            grid
            grid-cols-2
            gap-5
            "
          >

            <div className="bg-orange-50 rounded-2xl p-5">

              <Sparkles
                className="text-orange-500 mb-3"
                size={26}
              />

              <h4 className="font-bold">
                Fresh Ingredients
              </h4>

              <p className="text-gray-500 text-sm mt-2">
                Prepared fresh daily using premium quality ingredients.
              </p>

            </div>

            <div className="bg-rose-50 rounded-2xl p-5">

              <ShoppingCart
                className="text-rose-500 mb-3"
                size={26}
              />

              <h4 className="font-bold">
                Fast Delivery
              </h4>

              <p className="text-gray-500 text-sm mt-2">
                Hot and delicious meals delivered directly to your doorstep.
              </p>

            </div>

          </div>

        </div>

      </motion.div>
            {/* =====================================
              RELATED MEALS
      ===================================== */}

      <section className="mt-24">

        <div className="text-center mb-12">

          <span
            className="
            inline-block
            px-5
            py-2
            rounded-full
            bg-orange-100
            text-orange-600
            font-bold
            "
          >
            More Delicious Meals
          </span>

          <h2
            className="
            mt-4
            text-4xl
            font-black
            text-gray-900
            "
          >
            You May Also Like
          </h2>

          <p className="text-gray-500 mt-3">
            Discover more meals from our kitchen.
          </p>

        </div>

        {loadingRelated ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[1,2,3].map((item)=>(

              <div
                key={item}
                className="
                animate-pulse
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-lg
                "
              >

                <div className="h-64 bg-gray-200"></div>

                <div className="p-5">

                  <div className="h-6 bg-gray-200 rounded mb-4"></div>

                  <div className="h-4 bg-gray-200 rounded mb-2"></div>

                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>

                </div>

              </div>

            ))}

          </div>

        ) : relatedMeals.length === 0 ? (

          <div className="text-center py-16">

            <ShoppingCart
              size={60}
              className="mx-auto text-gray-300 mb-5"
            />

            <h3 className="text-2xl font-bold text-gray-700">
              No Related Meals
            </h3>

            <p className="text-gray-500 mt-3">
              Try browsing other delicious categories.
            </p>

            <button

              onClick={()=>navigate("/menu")}

              className="
              mt-8
              px-8
              py-3
              rounded-xl
              bg-rose-500
              text-white
              hover:bg-rose-600
              transition
              "

            >

              Browse Menu

            </button>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {relatedMeals.map((item)=>(

              <motion.div

                key={item._id}

                whileHover={{
                  y:-8,
                  scale:1.02
                }}

                transition={{
                  duration:0.3
                }}

                className="
                bg-white
                rounded-3xl
                shadow-xl
                overflow-hidden
                border
                border-gray-100
                "

              >

                <img

                  src={
                    item.image
                      ? `http://localhost:5000${item.image}`
                      : "/default-food.jpg"
                  }

                  onError={(e)=>{
                    e.target.src="/default-food.jpg";
                  }}

                  alt={item.name}

                  className="
                  w-full
                  h-64
                  object-contain
                  bg-gray-50
                  p-5
                  hover:scale-105
                  transition
                  duration-500
                  "

                />

                <div className="p-6">

                  <div className="flex justify-between">

                    <h3 className="font-black text-xl">

                      {item.name}

                    </h3>

                    <span className="text-rose-500 font-black">

                      ₦{item.price.toLocaleString()}

                    </span>

                  </div>

                  <p
                    className="
                    mt-4
                    text-gray-500
                    line-clamp-2
                    "
                  >

                    {item.description}

                  </p>

                  <div className="mt-6 flex gap-3">

                    <Link
                      to={`/menu/${item._id}`}
                      className="flex-1"
                    >

                      <button
                        className="
                        w-full
                        py-3
                        rounded-xl
                        border
                        border-rose-500
                        text-rose-500
                        hover:bg-rose-500
                        hover:text-white
                        transition
                        font-semibold
                        "
                      >
                        View Details
                      </button>

                    </Link>

                    <button

                      disabled={!item.isAvailable}

                      onClick={()=>{

                        addToCart({

                          ...item,

                          quantity:1,

                        });

                        toast.success("Added to cart");

                      }}

                      className="
                      flex-1
                      py-3
                      rounded-xl
                      bg-gradient-to-r
                      from-rose-500
                      to-orange-500
                      text-white
                      font-semibold
                      hover:scale-105
                      transition
                      disabled:opacity-50
                      "

                    >

                      Add

                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        )}

      </section>

      {/* =====================================
              CALL TO ACTION
      ===================================== */}

      <section
        className="
        mt-24
        rounded-[40px]
        overflow-hidden
        bg-gradient-to-r
        from-rose-500
        via-pink-500
        to-orange-500
        text-white
        shadow-2xl
        "
      >

        <div className="px-10 py-20 text-center">

          <h2 className="text-5xl font-black">

            Ready to Enjoy Your Meal?

          </h2>

          <p
            className="
            mt-6
            max-w-3xl
            mx-auto
            text-white/90
            text-lg
            leading-8
            "
          >

            Freshly prepared meals, premium ingredients,
            and lightning-fast delivery. Experience
            restaurant-quality dining from the comfort
            of your home.

          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">

            <button

              onClick={handleAddToCart}

              disabled={!meal.isAvailable}

              className="
              px-10
              py-4
              rounded-2xl
              bg-white
              text-rose-500
              font-black
              hover:scale-105
              transition
              disabled:opacity-50
              "

            >

              Add To Cart

            </button>

            <button

              onClick={()=>navigate("/menu")}

              className="
              px-10
              py-4
              rounded-2xl
              border-2
              border-white
              hover:bg-white
              hover:text-rose-500
              transition
              font-bold
              "

            >

              Continue Shopping

            </button>

          </div>

        </div>

      </section>

    </div>

  );

}

export default MealDetails;









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
