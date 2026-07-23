// search, filter, sort and display menu items with add to cart functionality

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Heart,
  ArrowUpDown,
} from "lucide-react";
import { motion } from "framer-motion";
import API from "../services/api";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function CustomerMenu() {
  const { addToCart } = useCart();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [search, setSearch] = useState("");

  // Category
  const [category, setCategory] = useState("All");

  // Availability
  const [availability, setAvailability] = useState("All");

  // Dietary
  const [dietary, setDietary] = useState("All");

  // Sort
  const [sortBy, setSortBy] = useState("Newest");

  // Price
  const [priceRange, setPriceRange] = useState(10000);

  // ===============================
  // Fetch Menu
  // ===============================

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await API.get("/menu");

        const items = response.data.data.menuItems;

        setMeals(items);

        if (items.length > 0) {
          const highestPrice = Math.max(
            ...items.map((item) => item.price)
          );

          setPriceRange(highestPrice);
        }
      } catch (err) {
        console.log(err);
        setError("Unable to load menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // ===============================
  // Categories
  // ===============================

  const categories = useMemo(() => {
    const list = [
      "All",
      ...new Set(meals.map((item) => item.category)),
    ];

    return list;
  }, [meals]);

  // ===============================
  // Dietary
  // ===============================

  const dietaryOptions = useMemo(() => {
    const tags = meals.flatMap((item) => item.isDietary);

    return ["All", ...new Set(tags)];
  }, [meals]);

  // ===============================
  // Filter Meals
  // ===============================

  const filteredMeals = useMemo(() => {
    let data = [...meals];

    // Search

    data = data.filter((meal) => {
      return (
        meal.name.toLowerCase().includes(search.toLowerCase()) ||
        meal.description
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        meal.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        meal.isDietary
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    // Category

    if (category !== "All") {
      data = data.filter(
        (meal) => meal.category === category
      );
    }

    // Dietary

    if (dietary !== "All") {
      data = data.filter((meal) =>
        meal.isDietary.includes(dietary)
      );
    }

    // Availability

    if (availability === "Available") {
      data = data.filter((meal) => meal.isAvailable);
    }

    if (availability === "Unavailable") {
      data = data.filter((meal) => !meal.isAvailable);
    }

    // Price

    data = data.filter(
      (meal) => meal.price <= priceRange
    );

    // Sorting

    switch (sortBy) {
      case "Price Low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "Price High":
        data.sort((a, b) => b.price - a.price);
        break;

      case "Name":
        data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return data;
  }, [
    meals,
    search,
    category,
    dietary,
    availability,
    priceRange,
    sortBy,
  ]);

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-xl font-semibold text-gray-500 animate-pulse">
          Loading delicious meals...
        </h2>
      </div>
    );
  }

  // ===============================
  // Error
  // ===============================

  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-red-500 text-xl font-bold">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white via-pink-50 to-orange-50 min-h-screen">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 pt-12">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black text-gray-800">
            Discover Delicious Meals
          </h1>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Freshly prepared meals crafted by our chefs.
            Search, filter and order your favourite meals
            with ease.
          </p>
        </motion.div>

        {/* SEARCH */}

        <div className="relative mb-10">

  <Search
    size={22}
    className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-500"
  />

  <input
    type="text"
    placeholder="Search meals, categories, dietary..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      h-14
      pl-14
      pr-6
      rounded-2xl
      bg-white
      border-2
      border-gray-200
      text-gray-800
      placeholder:text-gray-400
      shadow-md
      transition-all
      duration-300
      focus:border-pink-500
      focus:ring-4
      focus:ring-pink-200
      outline-none
    "
  />

</div>

        {/* FILTERS */}

        <div className="mt-8 bg-orange-700 rounded-3xl shadow-xl p-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 text-orange-700">

            {/* Category */}

            <div>

              <label className="text-sm font-semibold">
                Category
              </label>

              <select
                className="mt-2 w-full border rounded-xl p-3"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* Dietary */}

            <div>

              <label className="text-sm font-semibold">
                Dietary
              </label>

              <select
                className="mt-2 w-full border rounded-xl p-3"
                value={dietary}
                onChange={(e) =>
                  setDietary(e.target.value)
                }
              >
                {dietaryOptions.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </div>

            {/* Availability */}

            <div>

              <label className="text-sm font-semibold">
                Availability
              </label>

              <select
                className="mt-2 w-full border rounded-xl p-3"
                value={availability}
                onChange={(e) =>
                  setAvailability(e.target.value)
                }
              >
                <option>All</option>
                <option>Available</option>
                <option>Unavailable</option>
              </select>

            </div>

            {/* Sort */}

            <div>

              <label className="text-sm font-semibold">
                Sort By
              </label>

              <select
                className="mt-2 w-full border rounded-xl p-3"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >
                <option>Newest</option>
                <option>Price Low</option>
                <option>Price High</option>
                <option>Name</option>
              </select>

            </div>

            {/* Price */}

            <div>

              <label className="text-sm font-semibold">
                Max Price
              </label>

              <div className="mt-2">

                <input
                  type="range"
                  min="0"
                  max={
                    meals.length
                      ? Math.max(
                          ...meals.map(
                            (m) => m.price
                          )
                        )
                      : 10000
                  }
                  value={priceRange}
                  onChange={(e) =>
                    setPriceRange(Number(e.target.value))
                  }
                  className="w-full accent-pink-500"
                />

                <p className="font-bold text-pink-600 mt-2">
                  ₦{priceRange.toLocaleString()}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* MENU GRID STARTS IN PART 2 */}

                {/* MENU GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-10">

          {filteredMeals.length === 0 ? (

            <div className="col-span-full text-center py-20">

              <h2 className="text-3xl font-bold text-gray-700">
                No Meals Found
              </h2>

              <p className="text-gray-500 mt-3">
                Try changing your search or filters.
              </p>

            </div>

          ) : (

            filteredMeals.map((meal) => (

              <motion.div

                key={meal._id}

                initial={{ opacity: 0, y: 40 }}

                animate={{ opacity: 1, y: 0 }}

                whileHover={{
                  y: -12,
                  scale: 1.02
                }}

                transition={{
                  duration: .35
                }}

                className="group bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl border border-pink-100 transition-all duration-500"

              >

                {/* IMAGE */}

                <div className="relative h-72 bg-gradient-to-br from-pink-50 via-orange-50 to-white overflow-hidden">

                  <img

                    src={
                      meal.image
                        ? `http://localhost:5000${meal.image}`
                        : "/default-food.jpg"
                    }

                    alt={meal.name}

                    className="w-full h-full object-contain p-5 transition duration-700 group-hover:scale-110"

                  />

                  {/* CATEGORY */}

                  <span className="absolute left-5 top-5 bg-white/95 backdrop-blur-md text-pink-600 px-4 py-2 rounded-full text-xs font-bold shadow">

                    {meal.category}

                  </span>

                  {/* HEART */}

                  <button

                    className="absolute right-5 top-5 bg-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition hover:bg-pink-500 hover:text-white"

                  >

                    <Heart size={18} />

                  </button>

                  {/* AVAILABILITY */}

                  <span

                    className={`absolute bottom-5 left-5 px-4 py-2 rounded-full text-xs font-bold shadow

                    ${meal.isAvailable

                      ? "bg-green-100 text-green-700"

                      : "bg-red-100 text-red-600"

                    }

                    `}

                  >

                    {meal.isAvailable

                      ? "Available"

                      : "Unavailable"}

                  </span>

                </div>

                {/* BODY */}

                <div className="p-6">

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-2xl font-black text-gray-800">

                        {meal.name}

                      </h2>

                      <p className="text-pink-500 font-bold mt-2 text-xl">

                        ₦{meal.price.toLocaleString()}

                      </p>

                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-5 text-gray-500 leading-7 line-clamp-2">

                    {meal.description}

                  </p>

                  {/* DIETARY */}

                  <div className="flex flex-wrap gap-2 mt-6">

                    {meal.isDietary.length > 0 ? (

                      meal.isDietary.map((item) => (

                        <span

                          key={item}

                          className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold"

                        >

                          {item}

                        </span>

                      ))

                    ) : (

                      <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">

                        No Dietary Tag

                      </span>

                    )}

                  </div>

                  {/* BUTTONS */}

                  <div className="flex gap-4 mt-8">

                    <Link to={`/menu/${meal._id}`} className="flex-1">
  <button className="w-full py-3 rounded-xl border-2 border-pink-500 text-pink-500 font-bold hover:bg-pink-500 hover:text-white transition" >
  
    View Details
  </button>
</Link>

                    <button

                      disabled={!meal.isAvailable}

                      onClick={() => addToCart(meal)}

                      className={`flex-1 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition

                      ${meal.isAvailable

                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:scale-105"

                        : "bg-gray-300 cursor-not-allowed"

                      }

                      `}

                    >

                      <ShoppingCart size={18} />

                      Add

                    </button>

                  </div>

                </div>

              </motion.div>

            ))

          )}

        </div>

      </section>

    </div>

  );

}

export default CustomerMenu;