import React from 'react'

function Checkout() {
  return (
    <div>Checkout</div>
  )
}

export default Checkout
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import useCart from '../hooks/useCart';
// import useAuth from '../hooks/useAuth';
// import { paymentService } from '../services/paymentService';
// import apiClient, { mockApi } from '../services/api';
// import { Landmark, Truck, Wallet, ShieldAlert, CreditCard, ChevronRight, ClipboardCheck } from 'lucide-react';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import AnimatedButton from '../components/ui/AnimatedButton';
// import ErrorAlert from '../components/ui/ErrorAlert';

// export const Checkout = () => {
//   const { activeItems, subtotal, deliveryFee, total, clearCart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();
  
//   const [selectedMethod, setSelectedMethod] = useState('cash_on_delivery');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       address: '',
//       phone: user?.phone || '',
//       notes: '',
//     }
//   });

//   const onSubmit = async (data) => {
//     if (activeItems.length === 0) {
//       toast.error('Your cart has no active items to checkout.');
//       return;
//     }

//     setIsProcessing(true);
//     setErrorMsg('');
    
//     try {
//       // 1. Process simulated payment
//       const paymentResult = await paymentService.processPayment(selectedMethod, total, {
//         name: user.name,
//         email: user.email,
//         phone: data.phone,
//         address: data.address,
//       });

//       // 2. Post order to mock DB
//       const orderPayload = {
//         userId: user.id,
//         customerName: user.name,
//         email: user.email,
//         phone: data.phone,
//         items: activeItems.map(item => ({
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           image: item.image,
//         })),
//         subtotal,
//         deliveryFee,
//         total,
//         paymentMethod: selectedMethod,
//         address: data.address,
//         notes: data.notes,
//         paymentReference: paymentResult.reference,
//       };

//       /*
//       // ====================================================
//       // PRODUCTION API CALL (AXIOS INTEGRATION)
//       // ====================================================
//       // To post your order to a live backend, uncomment:
//       //
//       // const response = await apiClient.post('/orders', orderPayload);
//       // const newOrder = response.data;
//       // ====================================================
//       */

//       await mockApi.orders.create(orderPayload);
      
//       toast.success('Congratulations! Your order has been placed.');
//       clearCart();
//       navigate('/orders');
//     } catch (err) {
//       setErrorMsg(err.message || 'Failed to place order. Please check billing or choose COD.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (activeItems.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center gap-4">
//         <h2 className="text-xl font-bold text-gray-800">Checkout is Unavailable</h2>
//         <p className="text-sm text-gray-500">Your cart does not contain active items.</p>
//         <Link to="/menu">
//           <button className="px-5 py-2.5 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white rounded-xl font-bold text-xs">
//             Browse Menu
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   const paymentMethods = [
//     { id: 'cash_on_delivery', name: 'Cash on Delivery', desc: 'Settle order at your doorstep.', icon: <Wallet className="w-5 h-5 text-green-600" />, badge: 'Standard' },
//     { id: 'paystack', name: 'Paystack Secure', desc: 'Secure card/transfer payment gateway.', icon: <Landmark className="w-5 h-5 text-[#09A5DB]" />, badge: 'Coming Soon', disabled: true },
//     { id: 'flutterwave', name: 'Flutterwave Gateway', desc: 'Global card checkouts integration.', icon: <CreditCard className="w-5 h-5 text-[#F5A623]" />, badge: 'Coming Soon', disabled: true },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <div className="p-3 bg-orange-50 text-[#FF9F1C] rounded-2xl">
//           <ClipboardCheck className="w-6 h-6" />
//         </div>
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-black text-gray-800">Checkout Delivery Details</h1>
//           <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">
//             Complete your shipping fields and choose payment
//           </p>
//         </div>
//       </div>

//       <ErrorAlert message={errorMsg} onClose={() => setErrorMsg('')} />

//       <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* Left Columns: Fields & Payment */}
//         <div className="lg:col-span-2 flex flex-col gap-8">
          
//           {/* Shipping Fields */}
//           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
//             <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3 mb-1">
//               <Truck className="w-4 h-4 text-[#FF4D6D]" /> Delivery Information
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* Delivery Address */}
//               <div className="flex flex-col gap-1 sm:col-span-2">
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Street Delivery Address</label>
//                 <input
//                   type="text"
//                   placeholder="Apartment, Street Name, District, City"
//                   className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
//                   {...register('address', { required: 'Delivery address is required' })}
//                 />
//                 {errors.address && <span className="text-[10px] text-red-500 font-medium">{errors.address.message}</span>}
//               </div>

//               {/* Phone Number */}
//               <div className="flex flex-col gap-1">
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Phone Number</label>
//                 <input
//                   type="tel"
//                   placeholder="+234..."
//                   className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
//                   {...register('phone', { required: 'Contact phone number is required' })}
//                 />
//                 {errors.phone && <span className="text-[10px] text-red-500 font-medium">{errors.phone.message}</span>}
//               </div>

//               {/* Order Notes */}
//               <div className="flex flex-col gap-1 sm:col-span-2">
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order Note (Optional)</label>
//                 <textarea
//                   rows={3}
//                   placeholder="E.g., Please ring the bell, specify spice preference, or directions..."
//                   className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold"
//                   {...register('notes')}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Payment Methods */}
//           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
//             <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3 mb-1">
//               <Wallet className="w-4 h-4 text-[#FF9F1C]" /> Select Payment Method
//             </h3>

//             <div className="flex flex-col gap-3">
//               {paymentMethods.map((method) => {
//                 const isSelected = selectedMethod === method.id;
//                 return (
//                   <label
//                     key={method.id}
//                     className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer select-none transition-all duration-300 ${
//                       isSelected 
//                         ? 'border-[#FF4D6D] bg-[#FFF7F8] shadow-sm' 
//                         : 'border-gray-150 hover:bg-gray-50'
//                     } ${method.disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
//                     onClick={() => {
//                       if (!method.disabled) {
//                         setSelectedMethod(method.id);
//                       }
//                     }}
//                   >
//                     <div className="flex items-center gap-3.5">
//                       <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white' : 'bg-gray-50'} border shrink-0`}>
//                         {method.icon}
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-gray-800">{method.name}</p>
//                         <p className="text-[10px] text-gray-400 font-medium mt-0.5">{method.desc}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
//                         isSelected 
//                           ? 'bg-[#FFE5E9] text-[#FF4D6D]' 
//                           : 'bg-gray-100 text-gray-500'
//                       }`}>
//                         {method.badge}
//                       </span>
//                       <input
//                         type="radio"
//                         name="payment_method"
//                         checked={isSelected}
//                         disabled={method.disabled}
//                         onChange={() => {}}
//                         className="w-4.5 h-4.5 accent-[#FF4D6D] cursor-pointer"
//                       />
//                     </div>
//                   </label>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Order Summary Checklist */}
//         <div className="lg:col-span-1">
//           <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-24 flex flex-col gap-6">
//             <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-3">
//               Summary Checklist
//             </h3>

//             {/* Scrollable list of items */}
//             <div className="flex flex-col gap-3.5 max-h-56 overflow-y-auto pr-1 no-scrollbar">
//               {activeItems.map((item) => (
//                 <div key={item.id} className="flex justify-between items-center gap-3">
//                   <div className="flex items-center gap-2">
//                     <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
//                     <div>
//                       <h4 className="text-[10px] font-bold text-gray-700 line-clamp-1 max-w-[120px]">{item.name}</h4>
//                       <p className="text-[9px] text-gray-400 font-semibold">Qty: {item.quantity}</p>
//                     </div>
//                   </div>
//                   <span className="text-[11px] font-bold text-gray-700">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Subtotal & Delivery Row */}
//             <div className="border-t border-gray-100 pt-4 flex flex-col gap-2.5 text-xs text-gray-500">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span className="font-bold text-gray-700">${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery Fee</span>
//                 {deliveryFee === 0 ? (
//                   <span className="text-green-600 font-extrabold bg-green-50 px-2 py-0.5 rounded text-[10px]">Free</span>
//                 ) : (
//                   <span className="font-bold text-gray-700">${deliveryFee.toFixed(2)}</span>
//                 )}
//               </div>
//             </div>

//             {/* Total */}
//             <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
//               <span className="text-xs font-bold text-gray-700">Final Total</span>
//               <span className="text-lg font-black text-[#FF4D6D]">${total.toFixed(2)}</span>
//             </div>

//             {selectedMethod !== 'cash_on_delivery' && (
//               <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[10px] p-3 rounded-xl flex gap-2 font-medium leading-relaxed">
//                 <ShieldAlert className="w-4 h-4 shrink-0 text-amber-500" />
//                 Selected gateway is coming soon! Please choose Cash on Delivery for sandbox testing.
//               </div>
//             )}

//             {/* Place Order CTA */}
//             <AnimatedButton
//               type="submit"
//               disabled={isProcessing}
//               className="w-full mt-2 py-3.5"
//             >
//               {isProcessing ? 'Processing Order...' : 'Place Secure Order'}
//             </AnimatedButton>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Checkout;
