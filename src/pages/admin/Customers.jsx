
import React from 'react'

function Customers() {
  return (
    <div>Customers</div>
  )
}

export default Customers
// import React, { useState, useEffect } from 'react';
// import { mockApi } from '../../services/api';
// import { Users, Search, RefreshCw, Mail, Phone, Calendar, DollarSign, ShoppingBag } from 'lucide-react';

// export const Customers = () => {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const data = await mockApi.customers.getAll();
//         setCustomers(data);
//       } catch (err) {
//         console.error('Error fetching customers:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   const filteredCustomers = customers.filter(customer => {
//     return (
//       customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       customer.phone.includes(searchQuery)
//     );
//   });

//   return (
//     <div className="flex flex-col gap-8">
//       {/* Action Row */}
//       <section className="bg-white p-5 rounded-3xl border border-gray-150 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
//         {/* Search */}
//         <div className="relative w-full sm:max-w-xs">
//           <Search className="absolute inset-y-0 left-3.5 my-auto w-4.5 h-4.5 text-gray-400" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search customers (Name, email, phone)..."
//             className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-150 rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#FF4D6D] transition-colors"
//           />
//         </div>
//       </section>

//       {/* Customers List Table */}
//       <section className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm">
//         {loading ? (
//           <div className="p-8 text-center flex items-center justify-center gap-2">
//             <RefreshCw className="w-5 h-5 animate-spin text-[#FF4D6D]" />
//             <span className="text-xs text-gray-500 font-bold">Mapping Customer Accounts...</span>
//           </div>
//         ) : filteredCustomers.length === 0 ? (
//           <div className="p-12 text-center text-xs text-gray-400 font-bold">
//             No customers matching search filters.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase text-gray-400">
//                   <th className="py-4 px-6">Customer</th>
//                   <th className="py-4 px-6">Contact Info</th>
//                   <th className="py-4 px-6">Joined Date</th>
//                   <th className="py-4 px-6 text-center">Orders Count</th>
//                   <th className="py-4 px-6 text-right">Delivered Volume</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
//                 {filteredCustomers.map((customer) => (
//                   <tr key={customer.id} className="hover:bg-[#FFF7F8]/20 transition-colors">
//                     {/* User profile with avatar */}
//                     <td className="py-4 px-6 flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full overflow-hidden border border-pink-100 shrink-0">
//                         {customer.avatar ? (
//                           <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
//                         ) : (
//                           <div className="w-full h-full bg-pink-50 text-[#FF4D6D] flex items-center justify-center font-bold text-xs">
//                             {customer.name.charAt(0)}
//                           </div>
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-extrabold text-gray-800">{customer.name}</p>
//                         <p className="text-[10px] text-gray-400">ID: {customer.id}</p>
//                       </div>
//                     </td>

//                     {/* Contacts */}
//                     <td className="py-4 px-6">
//                       <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {customer.email}</p>
//                       <p className="flex items-center gap-1.5 mt-0.5"><Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" /> {customer.phone}</p>
//                     </td>

//                     {/* Joined Date */}
//                     <td className="py-4 px-6 font-semibold text-gray-500">
//                       <span className="flex items-center gap-1.5">
//                         <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
//                         {customer.joined}
//                       </span>
//                     </td>

//                     {/* Total Orders */}
//                     <td className="py-4 px-6 text-center font-bold text-gray-500">
//                       <span className="inline-flex items-center gap-1 bg-purple-50 text-[#7B61FF] px-2.5 py-0.5 rounded-full border border-purple-100 font-extrabold text-[10px]">
//                         <ShoppingBag className="w-3 h-3" />
//                         {customer.totalOrders}
//                       </span>
//                     </td>

//                     {/* Total Spent */}
//                     <td className="py-4 px-6 text-right">
//                       <span className="inline-flex items-center gap-0.5 bg-green-50 text-green-600 px-2.5 py-0.5 rounded-full border border-green-100 font-black text-[10px]">
//                         <DollarSign className="w-3 h-3" />
//                         {customer.totalSpent.toFixed(2)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Customers;
