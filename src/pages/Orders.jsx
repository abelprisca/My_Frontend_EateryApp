
import React from 'react'

function Orders() {
  return (
    <div>Orders</div>
  )
}

export default Orders

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
