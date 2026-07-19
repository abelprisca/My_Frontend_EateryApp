import React from 'react'

function Analytics() {
  return (
    <div>Analytics</div>
  )
}

export default Analytics
// import React, { useState, useEffect } from 'react';
// import { mockApi } from '../../services/api';
// import { 
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   BarChart, Bar, PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { BarChart3, TrendingUp, Tag, PieChart as PieIcon, HelpCircle } from 'lucide-react';
// import SkeletonLoader from '../../components/ui/SkeletonLoader';

// export const Analytics = () => {
//   const [loading, setLoading] = useState(true);
//   const [revenueData, setRevenueData] = useState([]);
//   const [weeklyOrdersData, setWeeklyOrdersData] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);
//   const [statusData, setStatusData] = useState([]);

//   useEffect(() => {
//     const compileAnalytics = async () => {
//       try {
//         const orders = await mockApi.orders.getAll();

//         // 1. Revenue over last 7 days
//         const last7Days = Array.from({ length: 7 }).map((_, i) => {
//           const d = new Date();
//           d.setDate(d.getDate() - i);
//           return d.toISOString().split('T')[0];
//         }).reverse();

//         const revenueMap = {};
//         const ordersCountMap = {};
//         last7Days.forEach(date => {
//           revenueMap[date] = 0;
//           ordersCountMap[date] = 0;
//         });

//         orders.forEach(order => {
//           const orderDateStr = order.date.split('T')[0];
//           if (orderDateStr in revenueMap) {
//             ordersCountMap[orderDateStr] += 1;
//             if (order.status === 'delivered') {
//               revenueMap[orderDateStr] += order.total;
//             }
//           }
//         });

//         const lineChartData = last7Days.map(date => {
//           const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
//           return {
//             date: dayName,
//             Revenue: parseFloat(revenueMap[date].toFixed(2)),
//           };
//         });
//         setRevenueData(lineChartData);

//         // 2. Weekly Orders Counts (last 7 days)
//         const barChartData = last7Days.map(date => {
//           const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
//           return {
//             day: dayName,
//             Orders: ordersCountMap[date],
//           };
//         });
//         setWeeklyOrdersData(barChartData);

//         // 3. Category Pie Chart Distribution
//         const catCounts = {};
//         orders.forEach(order => {
//           order.items.forEach(item => {
//             const cat = item.category || 'Dishes';
//             catCounts[cat] = (catCounts[cat] || 0) + item.quantity;
//           });
//         });

//         const pieCatData = Object.entries(catCounts).map(([name, value]) => ({
//           name,
//           value,
//         }));
//         setCategoryData(pieCatData.length > 0 ? pieCatData : [{ name: 'Rice Dishes', value: 10 }, { name: 'Burgers', value: 5 }]);

//         // 4. Order Status Distribution
//         const statCounts = { pending: 0, preparing: 0, ready: 0, out_for_delivery: 0, delivered: 0, cancelled: 0 };
//         orders.forEach(order => {
//           statCounts[order.status] = (statCounts[order.status] || 0) + 1;
//         });

//         const pieStatData = Object.entries(statCounts)
//           .filter(([_, val]) => val > 0)
//           .map(([name, value]) => ({
//             name: name.replace(/_/g, ' ').toUpperCase(),
//             value,
//           }));
        
//         setStatusData(pieStatData.length > 0 ? pieStatData : [{ name: 'DELIVERED', value: 4 }, { name: 'PENDING', value: 2 }]);

//       } catch (err) {
//         console.error('Error generating analytics:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     compileAnalytics();
//   }, []);

//   const COLORS = ['#FF4D6D', '#FF9F1C', '#7B61FF', '#2563EB', '#16A34A', '#EC4899'];
//   const STATUS_COLORS = ['#F59E0B', '#2563EB', '#7B61FF', '#3B82F6', '#16A34A', '#DC2626'];

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <SkeletonLoader type="chart" count={4} />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-8">
//       {/* Visual Analytics Grid */}
//       <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
//         {/* Line Chart: Revenue Trend */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-4">
//           <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
//             <TrendingUp className="w-5 h-5 text-[#FF4D6D]" />
//             <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Revenue Trend (Last 7 Days)</h3>
//           </div>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
//                 <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
//                 <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
//                 <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '12px' }} />
//                 <Line type="monotone" dataKey="Revenue" stroke="#FF4D6D" strokeWidth={3} activeDot={{ r: 8 }} dot={{ stroke: '#FF4D6D', strokeWidth: 2, r: 4 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bar Chart: Weekly Orders count */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-4">
//           <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
//             <BarChart3 className="w-5 h-5 text-[#7B61FF]" />
//             <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Weekly Orders Count</h3>
//           </div>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={weeklyOrdersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
//                 <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
//                 <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
//                 <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '12px' }} />
//                 <Bar dataKey="Orders" fill="#7B61FF" radius={[8, 8, 0, 0]} barSize={28} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Pie Chart: Categories distribution */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-4">
//           <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
//             <Tag className="w-5 h-5 text-[#FF9F1C]" />
//             <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Categories Popularity</h3>
//           </div>
//           <div className="h-64 flex flex-col sm:flex-row items-center justify-center gap-4">
//             <div className="w-full sm:w-1/2 h-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={categoryData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={50}
//                     outerRadius={75}
//                     paddingAngle={3}
//                     dataKey="value"
//                   >
//                     {categoryData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip formatter={(value) => [`${value} qty`, 'Quantity']} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
            
//             <div className="w-full sm:w-1/2 flex flex-col gap-2.5 max-h-48 overflow-y-auto no-scrollbar justify-center">
//               {categoryData.map((entry, idx) => (
//                 <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-600">
//                   <div className="w-3.5 h-3.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
//                   <span className="truncate max-w-[120px] font-semibold">{entry.name}</span>
//                   <span className="text-gray-400 font-bold ml-auto">{entry.value} ordered</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Pie Chart: Order Status distribution */}
//         <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-4">
//           <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
//             <PieIcon className="w-5 h-5 text-[#16A34A]" />
//             <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Order Status Distribution</h3>
//           </div>
//           <div className="h-64 flex flex-col sm:flex-row items-center justify-center gap-4">
//             <div className="w-full sm:w-1/2 h-full">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={statusData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={0}
//                     outerRadius={75}
//                     paddingAngle={0}
//                     dataKey="value"
//                   >
//                     {statusData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip formatter={(value) => [`${value} orders`, 'Count']} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
            
//             <div className="w-full sm:w-1/2 flex flex-col gap-2.5 justify-center">
//               {statusData.map((entry, idx) => (
//                 <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-600">
//                   <div className="w-3.5 h-3.5 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: STATUS_COLORS[idx % STATUS_COLORS.length] }}></div>
//                   <span className="font-semibold">{entry.name}</span>
//                   <span className="text-gray-400 font-bold ml-auto">{entry.value} order{entry.value > 1 ? 's' : ''}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//       </section>
//     </div>
//   );
// };

// export default Analytics;
