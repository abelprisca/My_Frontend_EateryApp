//creating a page to display all the orders of the usermport React, { useEffect, useState } from "react";
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








// import React, { useState, useEffect } from 'react';
// import useAuth from '../hooks/useAuth';
// import apiClient, { mockApi } from '../services/api';
// import { ClipboardList, ChevronDown, ChevronUp, Clock, MapPin, DollarSign, Calendar } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import SkeletonLoader from '../components/ui/SkeletonLoader';
// import EmptyState from '../components/ui/EmptyState';

// export const Orders = () => {
//   const { user } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedOrderId, setExpandedOrderId] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return;
//       try {
//         /*
//         // ====================================================
//         // PRODUCTION API CALL (AXIOS INTEGRATION)
//         // ====================================================
//         // To retrieve orders from a live backend, uncomment:
//         //
//         // const response = await apiClient.get('/orders/my-orders');
//         // const data = response.data;
//         // setOrders(data);
//         // ====================================================
//         */

//         const data = await mockApi.orders.getByUser(user.id);
//         setOrders(data);
//         // Expand the first order by default if it exists
//         if (data.length > 0) {
//           setExpandedOrderId(data[0].id);
//         }
//       } catch (err) {
//         console.error('Error fetching orders:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [user]);

//   const toggleExpand = (orderId) => {
//     setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-amber-50 text-amber-600 border border-amber-100';
//       case 'preparing': return 'bg-blue-50 text-blue-600 border border-blue-100';
//       case 'ready': return 'bg-purple-50 text-purple-600 border border-purple-100';
//       case 'out_for_delivery': return 'bg-indigo-50 text-indigo-600 border border-indigo-100';
//       case 'delivered': return 'bg-green-50 text-green-600 border border-green-100';
//       case 'cancelled': return 'bg-red-50 text-red-500 border border-red-100';
//       default: return 'bg-gray-50 text-gray-500 border border-gray-150';
//     }
//   };

//   const getStatusProgress = (status) => {
//     const stages = ['pending', 'preparing', 'ready', 'out_for_delivery', 'delivered'];
//     const currentIdx = stages.indexOf(status);
//     if (status === 'cancelled') return 0;
//     return Math.round(((currentIdx + 1) / stages.length) * 100);
//   };

//   const trackingSteps = [
//     { label: 'Placed', status: 'pending' },
//     { label: 'Kitchen', status: 'preparing' },
//     { label: 'Packaging', status: 'ready' },
//     { label: 'On Route', status: 'out_for_delivery' },
//     { label: 'Delivered', status: 'delivered' },
//   ];

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex flex-col gap-4">
//           <SkeletonLoader type="list" count={3} />
//         </div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <EmptyState 
//           type="orders" 
//           title="No Orders Placed Yet" 
//           message="You haven't placed any food orders on EateryApp yet. Satifsy your appetite by checking out our fresh menu items!"
//           actionText="Find Delicious Food"
//           actionLink="/menu"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
//       {/* Page Title */}
//       <div className="flex items-center gap-3">
//         <div className="p-3 bg-pink-50 text-[#FF4D6D] rounded-2xl">
//           <ClipboardList className="w-6 h-6" />
//         </div>
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-black text-gray-800">My Order History</h1>
//           <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">
//             Track active deliveries and view detailed receipts of past orders
//           </p>
//         </div>
//       </div>

//       {/* Orders List */}
//       <div className="flex flex-col gap-5">
//         {orders.map((order) => {
//           const isExpanded = expandedOrderId === order.id;
//           const progress = getStatusProgress(order.status);
          
//           return (
//             <div 
//               key={order.id} 
//               className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
//             >
//               {/* Header Info */}
//               <div 
//                 onClick={() => toggleExpand(order.id)}
//                 className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none bg-gray-50/50 hover:bg-[#FFF7F8]/40 transition-colors"
//               >
//                 <div className="flex flex-wrap items-center gap-4">
//                   <div>
//                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
//                     <h3 className="font-extrabold text-sm text-gray-800">{order.id}</h3>
//                   </div>
                  
//                   <div className="border-l border-gray-200 pl-4">
//                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Placed Date</span>
//                     <p className="text-xs font-semibold text-gray-600 flex items-center gap-1 mt-0.5">
//                       <Calendar className="w-3.5 h-3.5" />
//                       {new Date(order.date).toLocaleDateString()}
//                     </p>
//                   </div>
                  
//                   <div className="border-l border-gray-200 pl-4">
//                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</span>
//                     <p className="text-xs font-black text-[#FF4D6D] mt-0.5">
//                       ${order.total.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${getStatusStyle(order.status)}`}>
//                     {order.status.replace(/_/g, ' ')}
//                   </span>
//                   {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
//                 </div>
//               </div>

//               {/* Expanded Receipt Details */}
//               <AnimatePresence>
//                 {isExpanded && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.25 }}
//                     className="border-t border-gray-100 p-5 flex flex-col gap-6"
//                   >
//                     {/* Live Tracker progress bar */}
//                     {order.status !== 'cancelled' && (
//                       <div className="bg-[#FFF7F8] p-5 rounded-2xl border border-pink-50 flex flex-col gap-4">
//                         <div className="flex justify-between items-center text-[10px] font-bold text-[#FF4D6D] uppercase">
//                           <span>Live Order Tracker</span>
//                           <span>{progress}% Completed</span>
//                         </div>
                        
//                         {/* Tracker bar */}
//                         <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden relative">
//                           <div 
//                             className="h-full bg-gradient-to-r from-[#FF4D6D] to-[#FF9F1C] rounded-full transition-all duration-500" 
//                             style={{ width: `${progress}%` }}
//                           />
//                         </div>

//                         {/* Tracker steps */}
//                         <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-1">
//                           {trackingSteps.map((step, idx) => {
//                             const isCurrent = order.status === step.status;
//                             const isPassed = trackingSteps.findIndex(s => s.status === order.status) >= idx;
//                             return (
//                               <span 
//                                 key={idx} 
//                                 className={`text-center ${
//                                   isCurrent ? 'text-[#FF4D6D]' : isPassed ? 'text-gray-700' : 'text-gray-400'
//                                 }`}
//                               >
//                                 {step.label}
//                               </span>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}

//                     {/* Receipt Items list */}
//                     <div className="flex flex-col gap-3.5">
//                       <h4 className="text-xs font-bold text-gray-800 border-b pb-1">Receipt Items</h4>
//                       <div className="flex flex-col gap-3">
//                         {order.items.map((item, idx) => (
//                           <div key={idx} className="flex justify-between items-center gap-4 text-xs text-gray-600">
//                             <div className="flex items-center gap-3">
//                               <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover border shrink-0" />
//                               <div>
//                                 <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
//                                 <p className="text-[10px] text-gray-400 font-semibold mt-0.5">Price: ${item.price.toFixed(2)}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-6">
//                               <span className="font-semibold text-gray-400">Qty: {item.quantity}</span>
//                               <span className="font-bold text-gray-800 w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Shipping info */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100 pt-5 text-xs text-gray-500">
//                       <div className="flex flex-col gap-2">
//                         <h4 className="font-bold text-gray-700">Delivery Information</h4>
//                         <div className="flex gap-2 items-start mt-1">
//                           <MapPin className="w-4 h-4 text-[#FF4D6D] shrink-0 mt-0.5" />
//                           <p className="leading-relaxed">{order.address}</p>
//                         </div>
//                         <div className="flex gap-2 items-center">
//                           <Clock className="w-4 h-4 text-[#FF9F1C] shrink-0" />
//                           <span>Phone: {order.phone}</span>
//                         </div>
//                         {order.notes && (
//                           <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-150 mt-1 font-semibold text-[10px] italic">
//                             Notes: "{order.notes}"
//                           </div>
//                         )}
//                       </div>

//                       <div className="flex flex-col gap-2">
//                         <h4 className="font-bold text-gray-700">Payment Details</h4>
//                         <div className="flex gap-2 items-center mt-1">
//                           <DollarSign className="w-4 h-4 text-green-500 shrink-0" />
//                           <span className="capitalize">Method: {order.paymentMethod.replace(/_/g, ' ')}</span>
//                         </div>
//                         {order.paymentReference && (
//                           <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
//                             Ref: {order.paymentReference}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Orders;
