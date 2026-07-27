import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Trash2,
  ShoppingBag,
  Plus,
  Minus,
  ArrowRight,
  Bookmark,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import useCart from "../hooks/useCart";
import EmptyState from "../components/ui/EmptyState";
const IMAGE_BASE_URL = "https://my-backend-eateryapp.onrender.com";
const Cart = () => {
  const {
    cartItems,
    activeItems,
    savedItems,
    subtotal,
    deliveryFee,
    total,
    updateQuantity,
    removeFromCart,
    toggleSaveForLater,
  } = useCart();

  // Empty Cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-20">
        <EmptyState
          type="cart"
          title="Your Cart is Empty"
          message="You haven't added any delicious meals yet. Explore our menu and treat yourself today."
          actionText="Browse Menu"
          actionLink="/menu"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* ========================= */}
      {/* PAGE HEADER */}
      {/* ========================= */}

      <div className="flex items-center justify-between mb-10">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-500 to-red-500 text-white flex items-center justify-center shadow-xl">

            <ShoppingBag size={30} />

          </div>

          <div>

            <h1 className="text-4xl font-black text-gray-800">
              My Cart
            </h1>

            <p className="text-gray-500 mt-1">
              {activeItems.length} Active Item(s) • {savedItems.length} Saved
            </p>

          </div>

        </div>

        <Link to="/menu">

          <button
            className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-2xl
            border
            border-pink-300
            text-pink-600
            font-bold
            hover:bg-pink-500
            hover:text-white
            transition-all
            duration-300
            "
          >

            <ArrowLeft size={18} />

            Continue Shopping

          </button>

        </Link>

      </div>

      {/* ========================= */}
      {/* MAIN GRID */}
      {/* ========================= */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* ========================= */}
        {/* LEFT SIDE */}
        {/* ========================= */}

        <div className="lg:col-span-2 space-y-5">

          {
            activeItems.length === 0 ?

            (

              <div className="bg-white rounded-3xl shadow-lg border p-12 text-center">

                <ShoppingBag
                  className="mx-auto text-pink-500 mb-5"
                  size={55}
                />

                <h2 className="font-black text-2xl">
                  No Active Items
                </h2>

                <p className="text-gray-500 mt-3">
                  Move some saved meals back into your cart.
                </p>

              </div>

            )

            :

            (

              <AnimatePresence>

                {
                  activeItems.map((item) => (

                    <motion.div

                      key={item._id}

                      layout

                      initial={{
                        opacity: 0,
                        y: 30
                      }}

                      animate={{
                        opacity: 1,
                        y: 0
                      }}

                      exit={{
                        opacity: 0,
                        x: -100
                      }}

                      whileHover={{
                        y: -4,
                        scale: 1.01
                      }}

                      transition={{
                        duration: 0.25
                      }}

                      className="
                      bg-white
                      rounded-3xl
                      shadow-md
                      hover:shadow-2xl
                      border
                      border-gray-100
                      overflow-hidden
                      "

                    >

                      <div className="flex flex-col md:flex-row">

                        {/* IMAGE */}

                        <div className="md:w-60 h-52 bg-gray-50 overflow-hidden">

                          {item.image && (
  <img
    src={`${IMAGE_BASE_URL}${item.image}`}
    className="w-24 h-24 rounded-2xl object-contain bg-gray-50"
    alt={item.name}
  />
)}
                        </div>

                        {/* DETAILS */}

                        <div className="flex-1 p-6 flex flex-col justify-between">

                          <div>

                            <div className="flex justify-between">

                              <div>

                                <h2 className="text-2xl font-black text-gray-800">

                                  {item.name}

                                </h2>

                                <p className="text-sm text-pink-600 font-bold mt-1">

                                  {item.category}

                                </p>

                              </div>

                              <span
                                className="
                                bg-pink-50
                                text-pink-600
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-bold
                                h-fit
                                "
                              >

                                ₦{item.price.toLocaleString()}

                              </span>

                            </div>

                            <p className="text-gray-500 mt-4 leading-7 line-clamp-2">

                              {item.description}

                            </p>

                          </div>

                          <div className="flex flex-wrap items-center justify-between mt-8 gap-5">

                            {/* Quantity */}

                            <div
                              className="
                              flex
                              items-center
                              rounded-2xl
                              bg-pink-50
                              overflow-hidden
                              "
                            >

                              <button

                                onClick={() =>
                                  updateQuantity(
                                    item._id,
                                    item.quantity - 1
                                  )
                                }

                                className="
                                p-3
                                hover:bg-pink-200
                                transition
                                "

                              >

                                <Minus size={16} />

                              </button>

                              <span
                                className="
                                w-14
                                text-center
                                font-black
                                "
                              >

                                {item.quantity}

                              </span>

                              <button

                                onClick={() =>
                                  updateQuantity(
                                    item._id,
                                    item.quantity + 1
                                  )
                                }

                                className="
                                p-3
                                hover:bg-pink-200
                                transition
                                "

                              >

                                <Plus size={16} />

                              </button>

                            </div>
                                                        {/* Item Total + Actions */}

                            <div className="flex items-center gap-4">

                              <div className="text-right">

                                <p className="text-xs text-gray-400">
                                  Total
                                </p>

                                <h3 className="text-xl font-black text-pink-600">

                                  ₦{(
                                    item.price * item.quantity
                                  ).toLocaleString()}

                                </h3>

                              </div>

                              {/* Save for Later */}

                              <button

                                onClick={() =>
                                  toggleSaveForLater(item._id)
                                }

                                className="
                                w-11
                                h-11
                                rounded-xl
                                bg-orange-50
                                text-orange-500
                                hover:bg-orange-500
                                hover:text-white
                                transition-all
                                duration-300
                                flex
                                items-center
                                justify-center
                                "

                                title="Save for later"

                              >

                                <Heart size={18} />

                              </button>

                              {/* Remove */}

                              <button

                                onClick={() => {

                                  removeFromCart(item._id);

                                  toast.success(
                                    "Meal removed from cart"
                                  );

                                }}

                                className="
                                w-11
                                h-11
                                rounded-xl
                                bg-red-50
                                text-red-500
                                hover:bg-red-500
                                hover:text-white
                                transition-all
                                duration-300
                                flex
                                items-center
                                justify-center
                                "

                              >

                                <Trash2 size={18} />

                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    </motion.div>

                  ))
                }

              </AnimatePresence>

            )

          }

          {/* ========================= */}
          {/* SAVED FOR LATER */}
          {/* ========================= */}

          {

            savedItems.length > 0 && (

              <div className="mt-12">

                <h2 className="text-2xl font-black text-gray-800 mb-6">

                  Saved For Later

                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                  {

                    savedItems.map((item) => (

                      <motion.div

                        key={item._id}

                        whileHover={{
                          y: -4
                        }}

                        className="
                        bg-white
                        rounded-3xl
                        shadow-md
                        border
                        border-gray-100
                        p-5
                        "

                      >

                        <div className="flex gap-4">


                         {item.image && (
  <img
    src={`${IMAGE_BASE_URL}${item.image}`}
    className="w-24 h-24 rounded-2xl object-contain bg-gray-50"
    alt={item.name}
  />
)}

                          <div className="flex-1">

                            <h3 className="font-black text-lg">

                              {item.name}

                            </h3>

                            <p className="text-pink-600 font-bold mt-1">

                              ₦{item.price.toLocaleString()}

                            </p>

                            <div className="flex gap-2 mt-5">

                              <button

                                onClick={() =>
                                  toggleSaveForLater(
                                    item._id
                                  )
                                }

                                className="
                                flex-1
                                py-2.5
                                rounded-xl
                                bg-pink-500
                                text-white
                                font-bold
                                hover:bg-pink-600
                                transition
                                "

                              >

                                Move To Cart

                              </button>

                              <button

                                onClick={() => {

                                  removeFromCart(
                                    item._id
                                  );

                                  toast.success(
                                    "Meal removed"
                                  );

                                }}

                                className="
                                w-12
                                rounded-xl
                                bg-red-50
                                text-red-500
                                hover:bg-red-500
                                hover:text-white
                                transition
                                "

                              >

                                <Trash2
                                  size={18}
                                  className="mx-auto"
                                />

                              </button>

                            </div>

                          </div>

                        </div>

                      </motion.div>

                    ))

                  }

                </div>

              </div>

            )

          }

        </div>

                {/* ========================= */}
        {/* ORDER SUMMARY */}
        {/* ========================= */}

        <div className="lg:sticky lg:top-24 h-fit">

          <motion.div

            initial={{ opacity: 0, x: 40 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.4 }}

            className="
            bg-white
            rounded-3xl
            shadow-xl
            border
            border-gray-100
            overflow-hidden
            "

          >

            {/* Header */}

            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 p-6">

              <h2 className="text-2xl font-black text-white">

                Order Summary

              </h2>

              <p className="text-pink-100 mt-1 text-sm">

                Review your order before checkout

              </p>

            </div>

            <div className="p-6 space-y-5">

              {/* Items */}

              <div className="flex justify-between">

                <span className="text-gray-600">

                  Items

                </span>

                <span className="font-bold">

                  {activeItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">

                  Subtotal

                </span>

                <span className="font-bold">

                  ₦{subtotal.toLocaleString()}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">

                  Delivery

                </span>

                <span
                  className={`font-bold ${
                    deliveryFee === 0
                      ? "text-green-600"
                      : "text-gray-800"
                  }`}
                >

                  {deliveryFee === 0
                    ? "FREE"
                    : `₦${deliveryFee.toLocaleString()}`}

                </span>

              </div>

              {/* Free delivery progress */}

              {

                subtotal < 50000 && (

                  <div>

                    <div className="flex justify-between text-xs text-gray-500 mb-2">

                      <span>

                        Add

                        {" "}

                        ₦{(
                          50000 - subtotal
                        ).toLocaleString()}

                        {" "}

                        more for FREE delivery

                      </span>

                    </div>

                    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">

                      <div

                        style={{
                          width: `${Math.min(
                            (subtotal / 50000) * 100,
                            100
                          )}%`,
                        }}

                        className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-pink-500
                        to-red-500
                        "

                      />

                    </div>

                  </div>

                )

              }

              {/* Promo */}

              <div className="pt-3">

                <label className="text-sm font-semibold text-gray-700">

                  Promo Code

                </label>

                <div className="flex mt-2 gap-2">

                  <input

                    type="text"

                    placeholder="Enter code"

                    className="
                    flex-1
                    border
                    rounded-xl
                    px-4
                    py-3
                    focus:ring-2
                    focus:ring-pink-400
                    outline-none
                    "

                  />

                  <button

                    onClick={() =>
                      toast.success(
                        "Promo feature coming soon!"
                      )
                    }

                    className="
                    px-5
                    rounded-xl
                    bg-gray-900
                    text-white
                    font-bold
                    hover:bg-black
                    transition
                    "

                  >

                    Apply

                  </button>

                </div>

              </div>

              <hr />

              {/* Total */}

              <div className="flex justify-between items-center">

                <span className="text-lg font-bold">

                  Total

                </span>

                <span className="text-3xl font-black text-pink-600">

                  ₦{total.toLocaleString()}

                </span>

              </div>

              {/* Checkout */}

              <Link to="/checkout">

                <button

                  disabled={activeItems.length === 0}

                  className="
                  mt-4
                  w-full
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-pink-500
                  via-rose-500
                  to-red-500
                  text-white
                  font-black
                  text-lg
                  shadow-xl
                  hover:scale-105
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-3
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  "

                >

                  Proceed To Checkout

                  <ArrowRight size={22} />

                </button>

              </Link>

              {/* Continue Shopping */}

              <Link to="/menu">

                <button

                  className="
                  mt-4
                  w-full
                  py-3
                  rounded-2xl
                  border-2
                  border-pink-500
                  text-pink-600
                  font-bold
                  hover:bg-pink-500
                  hover:text-white
                  transition-all
                  duration-300
                  "

                >

                  Continue Shopping

                </button>

              </Link>

            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );

};

export default Cart;
