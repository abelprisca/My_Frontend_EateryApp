import React from 'react'

function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import apiClient, { mockApi } from '../../services/api';
// import { 
//   ShoppingBag, DollarSign, Clock, CheckCircle2, TrendingUp, Users, ArrowRight 
// } from 'lucide-react';
// import { motion } from 'framer-motion';
// import SkeletonLoader from '../../components/ui/SkeletonLoader';

// export const Dashboard = () => {
//   const [metrics, setMetrics] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     pendingOrders: 0,
//     deliveredOrders: 0,
//     averageOrderValue: 0,
//     newCustomersCount: 0,
//   });
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         /*
//         // ====================================================
//         // PRODUCTION API CALL (AXIOS INTEGRATION)
//         // ====================================================
//         // To pull dashboard stats from your backend, uncomment:
//         //
//         // const responseOrders = await apiClient.get('/admin/orders');
//         // const orders = responseOrders.data;
//         // const responseUsers = await apiClient.get('/admin/customers');
//         // const customers = responseUsers.data;
//         // ====================================================
//         */

//         const orders = await mockApi.orders.getAll();
//         const customers = await mockApi.customers.getAll();

//         const totalSpent = orders
//           .filter(o => o.status === 'delivered')
//           .reduce((sum, o) => sum + o.total, 0);

//         const pending = orders.filter(o => o.status === 'pending').length;
//         const delivered = orders.filter(o => o.status === 'delivered').length;
//         const avg = orders.length > 0 ? totalSpent / orders.length : 0;

//         setMetrics({
//           totalOrders: orders.length,
//           totalRevenue: parseFloat(totalSpent.toFixed(2)),
//           pendingOrders: pending,
//           deliveredOrders: delivered,
//           averageOrderValue: parseFloat(avg.toFixed(2)),
//           newCustomersCount: customers.length,
//         });

//         // Set top 4 recent orders
//         setRecentOrders(orders.slice(0, 4));
//       } catch (err) {
//         console.error('Error fetching dashboard statistics:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   const kpis = [
//     {
//       label: 'Total Orders',
//       value: metrics.totalOrders,
//       icon: <ShoppingBag className="w-6 h-6" />,
//       gradient: 'from-[#FF4D6D] to-[#E63956]',
//       shadow: 'shadow-pink-100',
//     },
//     {
//       label: 'Total Revenue',
//       value: `$${metrics.totalRevenue}`,
//       icon: <DollarSign className="w-6 h-6" />,
//       gradient: 'from-[#2563EB] to-[#7B61FF]',
//       shadow: 'shadow-blue-100',
//     },
//     {
//       label: 'Pending Orders',
//       value: metrics.pendingOrders,
//       icon: <Clock className="w-6 h-6" />,
//       gradient: 'from-[#FF9F1C] to-[#F59E0B]',
//       shadow: 'shadow-orange-100',
//     },
//     {
//       label: 'Delivered Orders',
//       value: metrics.deliveredOrders,
//       icon: <CheckCircle2 className="w-6 h-6" />,
//       gradient: 'from-[#16A34A] to-[#0D9488]',
//       shadow: 'shadow-green-100',
//     },
//     {
//       label: 'Average Ticket',
//       value: `$${metrics.averageOrderValue}`,
//       icon: <TrendingUp className="w-6 h-6" />,
//       gradient: 'from-[#7B61FF] to-[#4F46E5]',
//       shadow: 'shadow-purple-100',
//     },
//     {
//       label: 'New Customers',
//       value: metrics.newCustomersCount,
//       icon: <Users className="w-6 h-6" />,
//       gradient: 'from-[#EC4899] to-[#F43F5E]',
//       shadow: 'shadow-rose-100',
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="flex flex-col gap-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="h-32 bg-white rounded-2xl animate-pulse"></div>
//           <div className="h-32 bg-white rounded-2xl animate-pulse"></div>
//           <div className="h-32 bg-white rounded-2xl animate-pulse"></div>
//         </div>
//         <SkeletonLoader type="list" count={2} />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-8">
//       {/* Welcome Banner */}
//       <section className="bg-white p-6 rounded-3xl border border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4">
//         <div>
//           <h2 className="text-xl font-black text-gray-800">Operational Overview</h2>
//           <p className="text-xs text-gray-400 font-bold uppercase mt-0.5">Real-time terminal statistics</p>
//         </div>
//         <Link to="/admin/analytics">
//           <button className="px-4 py-2 bg-[#FFF7F8] hover:bg-[#FF4D6D] border border-pink-100 text-[#FF4D6D] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
//             View Analytics Charts
//             <ArrowRight className="w-3.5 h-3.5" />
//           </button>
//         </Link>
//       </section>

//       {/* KPI Cards Grid */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {kpis.map((kpi, idx) => (
//           <motion.div
//             key={idx}
//             whileHover={{ y: -4 }}
//             className={`rounded-2xl p-5 bg-gradient-to-r ${kpi.gradient} text-white shadow-lg ${kpi.shadow} flex items-center justify-between`}
//           >
//             <div className="flex flex-col gap-1.5">
//               <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">{kpi.label}</span>
//               <h3 className="text-2xl font-black">{kpi.value}</h3>
//             </div>
//             <div className="p-3 bg-white/15 rounded-xl text-white">
//               {kpi.icon}
//             </div>
//           </motion.div>
//         ))}
//       </section>

//       {/* Split: Recent Orders and Activity Log */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column: Recent Orders list */}
//         <section className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-4">
//           <div className="flex justify-between items-center border-b border-gray-50 pb-3">
//             <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Recent Orders</h3>
//             <Link to="/admin/orders" className="text-xs font-extrabold text-[#FF4D6D] hover:underline">
//               Manage All
//             </Link>
//           </div>

//           <div className="flex flex-col gap-3">
//             {recentOrders.map((order) => (
//               <div 
//                 key={order.id} 
//                 className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
//               >
//                 <div>
//                   <h4 className="font-bold text-xs text-gray-800">{order.id}</h4>
//                   <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{order.customerName} • {order.items.length} items</p>
//                 </div>

//                 <div className="text-right">
//                   <p className="text-xs font-black text-gray-800">${order.total.toFixed(2)}</p>
//                   <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full inline-block mt-1 ${
//                     order.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-500'
//                   }`}>
//                     {order.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Right Column: System Status */}
//         <section className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-4">
//           <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-3">
//             System Operations
//           </h3>

//           <div className="flex flex-col gap-4 text-xs text-gray-500">
//             <div className="flex justify-between">
//               <span>Database Sync</span>
//               <span className="font-bold text-green-600">Active</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Payment Gateway COD</span>
//               <span className="font-bold text-green-600">Online</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Card Processor API</span>
//               <span className="font-bold text-amber-500">Sandbox</span>
//             </div>
//             <div className="flex justify-between">
//               <span>AI Chatbot Node</span>
//               <span className="font-bold text-green-600">Online</span>
//             </div>
            
//             <div className="bg-[#FFF7F8] p-4.5 rounded-2xl border border-pink-50 text-[10px] font-semibold text-pink-700 leading-relaxed mt-2">
//               <span className="font-black uppercase tracking-wider block mb-1">Quick Note:</span>
//               Use the "Manage Menu" tab to create new meals and "Manage Orders" to progress order statuses.
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
