//creating a page to display all the orders of the user
//users can cancel their orders if they are still pending
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Clock,
  Eye,
  XCircle,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import API from "../services/api";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ===============================
  // GET MY ORDERS
  // ===============================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/orders/my-orders"
      );

      setOrders(
        response.data.data.orders
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ===============================
  // CANCEL ORDER
  // ===============================

  const cancelOrder = async (id) => {
    try {
      await API.post(
        `/orders/${id}/cancel`
      );

      toast.success(
        "Order cancelled successfully."
      );

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to cancel order."
      );
    }
  };

  // ===============================
  // STATUS COLORS
  // ===============================

  const statusColors = {
    PENDING:
      "bg-yellow-100 text-yellow-700",

    PREPARING:
      "bg-blue-100 text-blue-700",

    OUT_FOR_DELIVERY:
      "bg-purple-100 text-purple-700",

    DELIVERED:
      "bg-green-100 text-green-700",

    CANCELLED:
      "bg-red-100 text-red-700",
  };

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">

        <div className="text-center">

          <Package
            size={60}
            className="mx-auto text-rose-500 animate-bounce"
          />

          <h2 className="mt-6 text-xl font-bold text-gray-700">
            Loading your orders...
          </h2>

        </div>

      </div>
    );
  }

  // ===============================
  // ERROR
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

  // ===============================
  // EMPTY ORDERS
  // ===============================

  if (orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto py-20 px-5">

        <div className="bg-white rounded-3xl shadow-xl p-14 text-center">

          <ShoppingBag
            size={80}
            className="mx-auto text-rose-500"
          />

          <h2 className="text-3xl font-black mt-6">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-3">
            You haven't placed any order.
          </p>

          <button
            onClick={() => navigate("/menu")}
            className="
            mt-8
            px-8
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-rose-500
            to-orange-500
            text-white
            font-bold
            hover:scale-105
            transition
            "
          >
            Browse Menu
          </button>

        </div>

      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* HEADER */}

      <motion.div

        initial={{
          opacity:0,
          y:-20
        }}

        animate={{
          opacity:1,
          y:0
        }}

        className="mb-10"

      >

        <button

          onClick={() => navigate(-1)}

          className="
          flex
          items-center
          gap-2
          text-rose-600
          font-semibold
          hover:text-orange-500
          "

        >

          <ArrowLeft size={18} />

          Back

        </button>

        <h1 className="mt-5 text-5xl font-black text-gray-800">

          My Orders

        </h1>

        <p className="mt-2 text-gray-500">

          Track every delicious meal you've ordered.

        </p>

      </motion.div>

      <div className="space-y-8">
                {orders.map((order, index) => (

          <motion.div

            key={order._id}

            initial={{
              opacity:0,
              y:30
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              delay:index * 0.08
            }}

            whileHover={{
              y:-6,
              scale:1.01
            }}

            className="
            bg-white
            rounded-3xl
            shadow-lg
            hover:shadow-2xl
            transition-all
            duration-300
            border
            border-rose-100
            overflow-hidden
            "

          >

            {/* TOP BAR */}

            <div
              className="
              bg-gradient-to-r
              from-rose-500
              via-pink-500
              to-orange-500
              p-6
              text-white
              "
            >

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">

                <div>

                  <p className="text-sm opacity-90">

                    Order ID

                  </p>

                  <h2 className="font-black text-xl break-all">

                    #{order._id}

                  </h2>

                </div>

                <span
                  className={`
                  px-5
                  py-2
                  rounded-full
                  font-bold
                  text-sm
                  w-fit
                  bg-white
                  ${statusColors[order.status]}
                  `}
                >

                  {order.status.replaceAll("_"," ")}

                </span>

              </div>

            </div>

            {/* BODY */}

            <div className="p-8">

              <div className="grid lg:grid-cols-2 gap-8">

                {/* LEFT */}

                <div>

                  <h3 className="font-black text-lg mb-5">

                    Ordered Items

                  </h3>

                  <div className="space-y-4">

                    {order.items.map((item)=>(

                      <div

                        key={item._id}

                        className="
                        flex
                        justify-between
                        items-center
                        bg-gray-50
                        rounded-2xl
                        p-4
                        "

                      >

                        <div>

                          <h4 className="font-bold text-gray-800">

                            {item.menuItem?.name}

                          </h4>

                          <p className="text-sm text-gray-500">

                            Qty: {item.quantity}

                          </p>

                        </div>

                        <span className="font-black text-rose-600">

                          ₦{item.price.toLocaleString()}

                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                {/* RIGHT */}

                <div className="space-y-6">

                  <div
                    className="
                    bg-rose-50
                    rounded-2xl
                    p-5
                    "
                  >

                    <h3 className="font-black text-gray-800 mb-3">

                      Delivery Address

                    </h3>

                    <p className="text-gray-600">

                      {order.deliveryAddress}

                    </p>

                  </div>

                  <div
                    className="
                    bg-orange-50
                    rounded-2xl
                    p-5
                    "
                  >

                    <div className="flex justify-between">

                      <span className="text-gray-500">

                        Total Amount

                      </span>

                      <span className="font-black text-2xl text-rose-600">

                        ₦{order.totalAmount.toLocaleString()}

                      </span>

                    </div>

                  </div>

                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    text-gray-500
                    "
                  >

                    <Clock size={18}/>

                    {new Date(
                      order.createdAt
                    ).toLocaleString()}

                  </div>

                </div>

              </div>

              {/* ACTION BUTTONS */}

              <div
                className="
                mt-8
                flex
                flex-wrap
                gap-4
                justify-end
                "
              >

                <button

                  onClick={()=>
                    navigate(`/orders/${order._id}`)
                  }

                  className="
                  flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-500
                  to-cyan-500
                  text-white
                  font-bold
                  hover:scale-105
                  transition
                  "

                >

                  <Eye size={18}/>

                  View Details

                </button>

                {order.status==="PENDING" && (

                  <button

                    onClick={()=>
                      cancelOrder(order._id)
                    }

                    className="
                    flex
                    items-center
                    gap-2
                    px-6
                    py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-red-500
                    to-rose-500
                    text-white
                    font-bold
                    hover:scale-105
                    transition
                    "

                  >

                    <XCircle size={18}/>

                    Cancel Order

                  </button>

                )}

              </div>

            </div>

          </motion.div>

        ))}
              </div>

      {/* FOOTER */}

      <div
        className="
        mt-16
        text-center
        "
      >

        <div
          className="
          inline-flex
          items-center
          gap-2
          bg-gradient-to-r
          from-rose-50
          to-orange-50
          px-8
          py-4
          rounded-full
          shadow-sm
          border
          border-rose-100
          "
        >

          <Package
            className="text-rose-500"
            size={20}
          />

          <span className="font-semibold text-gray-600">

            Showing

            {" "}

            {orders.length}

            {" "}

            {orders.length === 1 ? "Order" : "Orders"}

          </span>

        </div>

      </div>

    </div>

  );

}

export default Orders;

