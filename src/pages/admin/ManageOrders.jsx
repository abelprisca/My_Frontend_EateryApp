import React from 'react'

function ManageOrders() {
  return (
    <div>ManageOrders</div>
  )
}

export default ManageOrders

// import React, { useState, useEffect } from 'react';
// import { mockApi } from '../../services/api';
// import { 
//   ClipboardList, Search, Eye, Filter, RefreshCw, MapPin, Phone, Mail, Clock 
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import toast from 'react-hot-toast';

// export const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [selectedOrder, setSelectedOrder] = useState(null); // for detail overlay modal

//   const fetchOrders = async () => {
//     try {
//       const data = await mockApi.orders.getAll();
//       setOrders(data);
//     } catch (err) {
//       toast.error('Failed to load orders.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const updated = await mockApi.orders.updateStatus(orderId, newStatus);
//       setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      
//       // Update selected order details view if open
//       if (selectedOrder && selectedOrder.id === orderId) {
//         setSelectedOrder(updated);
//       }
      
//       toast.success(`Order ${orderId} updated to: ${newStatus.toUpperCase()}`);
//     } catch (err) {
//       toast.error('Failed to update order status.');
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-amber-50 text-amber-600 border border-amber-150';
//       case 'preparing': return 'bg-blue-50 text-blue-600 border border-blue-150';
//       case 'ready': return 'bg-purple-50 text-purple-600 border border-purple-150';
//       case 'out_for_delivery': return 'bg-indigo-50 text-indigo-600 border border-indigo-150';
//       case 'delivered': return 'bg-green-50 text-green-600 border border-green-150';
//       case 'cancelled': return 'bg-red-50 text-red-500 border border-red-150';
//       default: return 'bg-gray-50 text-gray-500 border border-gray-150';
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchesSearch = 
//       order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.phone.includes(searchQuery);

//     const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <div className="flex flex-col gap-8">
//       {/* Search & Filter Controls */}
//       <section className="bg-white p-5 rounded-3xl border border-gray-150 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
//         {/* Search */}
//         <div className="relative w-full sm:max-w-xs">
//           <Search className="absolute inset-y-0 left-3.5 my-auto w-4.5 h-4.5 text-gray-400" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search orders (ID, client, phone)..."
//             className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-150 rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#FF4D6D] transition-colors"
//           />
//         </div>

//         {/* Filter Dropdown */}
//         <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-150 self-end sm:self-auto">
//           <Filter className="w-4 h-4 text-gray-400" />
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="bg-transparent text-xs font-bold text-gray-600 focus:outline-none cursor-pointer"
//           >
//             <option value="All">All Statuses</option>
//             <option value="pending">Pending</option>
//             <option value="preparing">Preparing</option>
//             <option value="ready">Ready</option>
//             <option value="out_for_delivery">On Route</option>
//             <option value="delivered">Delivered</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//         </div>
//       </section>

//       {/* Orders Table list */}
//       <section className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm">
//         {loading ? (
//           <div className="p-8 text-center flex items-center justify-center gap-2">
//             <RefreshCw className="w-5 h-5 animate-spin text-[#FF4D6D]" />
//             <span className="text-xs text-gray-500 font-bold">Checking Order Registry...</span>
//           </div>
//         ) : filteredOrders.length === 0 ? (
//           <div className="p-12 text-center text-xs text-gray-400 font-bold">
//             No customer orders matching the active filters.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase text-gray-400">
//                   <th className="py-4 px-6">Order ID</th>
//                   <th className="py-4 px-6">Customer Details</th>
//                   <th className="py-4 px-6">Items Qty</th>
//                   <th className="py-4 px-6">Total Amount</th>
//                   <th className="py-4 px-6">Delivery Status</th>
//                   <th className="py-4 px-6 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
//                 {filteredOrders.map((order) => (
//                   <tr key={order.id} className="hover:bg-[#FFF7F8]/20 transition-colors">
//                     {/* ID */}
//                     <td className="py-4 px-6 font-extrabold text-gray-800">{order.id}</td>

//                     {/* Customer Info */}
//                     <td className="py-4 px-6">
//                       <p className="font-bold text-gray-800">{order.customerName}</p>
//                       <p className="text-[10px] text-gray-400 mt-0.5">{order.phone}</p>
//                     </td>

//                     {/* Quantity */}
//                     <td className="py-4 px-6 font-bold text-gray-500">
//                       {order.items.reduce((s, i) => s + i.quantity, 0)} items
//                     </td>

//                     {/* Total */}
//                     <td className="py-4 px-6 font-black text-[#FF4D6D]">${order.total.toFixed(2)}</td>

//                     {/* Status Changer */}
//                     <td className="py-4 px-6">
//                       <select
//                         value={order.status}
//                         onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                         className={`font-black text-[10px] px-3 py-1 rounded-full uppercase border shadow-sm cursor-pointer focus:outline-none ${getStatusStyle(order.status)}`}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="preparing">Preparing</option>
//                         <option value="ready">Ready</option>
//                         <option value="out_for_delivery">On Route</option>
//                         <option value="delivered">Delivered</option>
//                         <option value="cancelled">Cancelled</option>
//                       </select>
//                     </td>

//                     {/* Action buttons */}
//                     <td className="py-4 px-6 text-right">
//                       <button
//                         onClick={() => setSelectedOrder(order)}
//                         className="p-2 border border-gray-150 hover:bg-pink-50 text-gray-500 hover:text-[#FF4D6D] rounded-xl transition-all"
//                         title="View Detailed Receipt"
//                       >
//                         <Eye className="w-3.5 h-3.5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>

//       {/* Expand Receipt Detail Overlay Modal */}
//       <AnimatePresence>
//         {selectedOrder && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setSelectedOrder(null)}
//               className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-xs"
//             />

//             {/* Modal Container */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 overflow-hidden z-10 border border-pink-50 relative flex flex-col gap-4 max-h-[85vh]"
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between border-b pb-3 shrink-0">
//                 <div>
//                   <h3 className="font-extrabold text-sm text-gray-800">Order Invoice Receipt</h3>
//                   <p className="text-[10px] text-gray-400 mt-0.5">ID: {selectedOrder.id}</p>
//                 </div>
//                 <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-50 rounded-full">
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Scrollable Content */}
//               <div className="overflow-y-auto pr-1 flex flex-col gap-5 no-scrollbar">
                
//                 {/* Client contacts */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-500 bg-gray-50 p-4 rounded-2xl border">
//                   <div className="flex flex-col gap-1">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase">Customer Profile</p>
//                     <p className="font-extrabold text-gray-800">{selectedOrder.customerName}</p>
//                     <p className="flex items-center gap-1.5 mt-0.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {selectedOrder.email}</p>
//                     <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> {selectedOrder.phone}</p>
//                   </div>
//                   <div className="flex flex-col gap-1 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase">Shipping Details</p>
//                     <p className="flex items-start gap-1.5 text-gray-700 font-semibold leading-relaxed mt-0.5">
//                       <MapPin className="w-3.5 h-3.5 text-[#FF4D6D] shrink-0 mt-0.5" />
//                       {selectedOrder.address}
//                     </p>
//                     {selectedOrder.notes && (
//                       <p className="text-[10px] italic text-gray-400 mt-1 font-semibold">Notes: "{selectedOrder.notes}"</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Items details list */}
//                 <div className="flex flex-col gap-3">
//                   <h4 className="text-[10px] font-bold text-gray-400 uppercase border-b pb-1">Receipt Items</h4>
//                   <div className="flex flex-col gap-3">
//                     {selectedOrder.items.map((item, idx) => (
//                       <div key={idx} className="flex justify-between items-center gap-4 text-xs">
//                         <div className="flex items-center gap-2.5">
//                           <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
//                           <p className="font-bold text-gray-800 line-clamp-1 max-w-[150px]">{item.name}</p>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <span className="text-gray-400 font-semibold">Qty: {item.quantity}</span>
//                           <span className="font-black text-gray-700 w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Financial Summary */}
//                 <div className="border-t border-gray-150 pt-4 text-xs text-gray-500 flex flex-col gap-2">
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span className="font-bold text-gray-700">${selectedOrder.subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Delivery Fee</span>
//                     <span className="font-bold text-gray-700">${selectedOrder.deliveryFee.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between border-t pt-3 items-center">
//                     <span className="text-xs font-bold text-gray-700">Total Settlement</span>
//                     <span className="text-base font-black text-[#FF4D6D]">${selectedOrder.total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Status Update shortcut inside modal */}
//               <div className="border-t border-gray-150 pt-4 flex items-center justify-between gap-4 shrink-0">
//                 <span className="text-xs font-bold text-gray-500">Update Status</span>
//                 <select
//                   value={selectedOrder.status}
//                   onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
//                   className={`font-black text-[10px] px-3.5 py-1.5 rounded-full uppercase border shadow-sm cursor-pointer focus:outline-none ${getStatusStyle(selectedOrder.status)}`}
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="preparing">Preparing</option>
//                   <option value="ready">Ready</option>
//                   <option value="out_for_delivery">On Route</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ManageOrders;
