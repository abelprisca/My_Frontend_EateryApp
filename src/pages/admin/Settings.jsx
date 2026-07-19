import React from 'react'

function Settings() {
  return (
    <div>Settings</div>
  )
}

export default Settings

// import React, { useState } from 'react';
// import { 
//   CreditCard, Store, ShieldCheck, Mail, ShieldAlert, Check, RefreshCw 
// } from 'lucide-react';
// import toast from 'react-hot-toast';

// export const Settings = () => {
//   const [loading, setLoading] = useState(false);
//   const [openStatus, setOpenStatus] = useState('open'); // open, closed
  
//   // Payment gates toggles
//   const [gateways, setGateways] = useState({
//     cod: true,
//     paystack: false,
//     flutterwave: false,
//     card: false,
//   });

//   const [fees, setFees] = useState({
//     deliveryFee: 3.50,
//     freeDeliveryThreshold: 50.00,
//   });

//   const handleToggleGateway = (gatewayKey) => {
//     if (gatewayKey === 'cod') {
//       toast.error('Cash on Delivery is a mandatory payment option for testing and cannot be deactivated.');
//       return;
//     }
    
//     // Gateway is blocked since it's "coming soon" in sandbox
//     toast.error('Payment gateway is currently locked in Sandbox mode. Cannot activate production integrations.');
//   };

//   const handleSaveSettings = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       toast.success('System settings updated successfully!');
//     }, 1000);
//   };

//   return (
//     <div className="max-w-3xl mx-auto flex flex-col gap-8">
//       {/* 1. Shop Status Section */}
//       <section className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-4">
//         <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3 mb-1">
//           <Store className="w-4.5 h-4.5 text-[#FF4D6D]" /> Store Operational Status
//         </h3>

//         <div className="flex items-center justify-between gap-6 text-xs text-gray-500">
//           <div>
//             <p className="font-bold text-gray-700">Operating Status</p>
//             <p className="mt-1">Control whether customers can place live orders on the platform.</p>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={() => { setOpenStatus('open'); toast.success('Store status set to: OPEN'); }}
//               className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
//                 openStatus === 'open'
//                   ? 'bg-green-50 text-green-600 border-green-200 font-extrabold'
//                   : 'bg-white text-gray-400 hover:bg-gray-50'
//               }`}
//             >
//               Open For Business
//             </button>
//             <button
//               onClick={() => { setOpenStatus('closed'); toast.warning('Store status set to: CLOSED'); }}
//               className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
//                 openStatus === 'closed'
//                   ? 'bg-red-50 text-red-500 border-red-200 font-extrabold'
//                   : 'bg-white text-gray-400 hover:bg-gray-50'
//               }`}
//             >
//               Closed / Maintenance
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 2. Payment Integrations Sandbox settings */}
//       <section id="payments" className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-4">
//         <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3 mb-1">
//           <CreditCard className="w-4.5 h-4.5 text-[#7B61FF]" /> Payment Gateways Activation
//         </h3>

//         <div className="flex flex-col gap-4">
//           {/* COD */}
//           <div className="flex items-center justify-between p-3.5 border border-green-150 bg-green-50/20 rounded-2xl">
//             <div>
//               <p className="text-xs font-bold text-gray-800">Cash on Delivery (COD)</p>
//               <p className="text-[10px] text-gray-400 font-medium mt-0.5">Allow physical settlement at the door.</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-[9px] font-black uppercase text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Mandatory</span>
//               <div className="w-10 h-6 bg-green-500 rounded-full p-1 flex items-center justify-end shadow-inner cursor-pointer" onClick={() => handleToggleGateway('cod')}>
//                 <div className="bg-white w-4.5 h-4.5 rounded-full shadow"></div>
//               </div>
//             </div>
//           </div>

//           {/* Paystack */}
//           <div className="flex items-center justify-between p-3.5 border border-gray-100 rounded-2xl">
//             <div>
//               <p className="text-xs font-bold text-gray-800">Paystack Checkout Gateway</p>
//               <p className="text-[10px] text-gray-400 font-medium mt-0.5">Receive secure payments in Africa.</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-[9px] font-black uppercase text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">Sandbox only</span>
//               <div className="w-10 h-6 bg-gray-200 rounded-full p-1 flex items-center shadow-inner cursor-pointer" onClick={() => handleToggleGateway('paystack')}>
//                 <div className="bg-white w-4.5 h-4.5 rounded-full shadow"></div>
//               </div>
//             </div>
//           </div>

//           {/* Flutterwave */}
//           <div className="flex items-center justify-between p-3.5 border border-gray-100 rounded-2xl">
//             <div>
//               <p className="text-xs font-bold text-gray-800">Flutterwave Merchant Gateway</p>
//               <p className="text-[10px] text-gray-400 font-medium mt-0.5">Receive global payments securely.</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-[9px] font-black uppercase text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">Sandbox only</span>
//               <div className="w-10 h-6 bg-gray-200 rounded-full p-1 flex items-center shadow-inner cursor-pointer" onClick={() => handleToggleGateway('flutterwave')}>
//                 <div className="bg-white w-4.5 h-4.5 rounded-full shadow"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. Delivery Fee config */}
//       <section className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col gap-4">
//         <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3 mb-1">
//           <Store className="w-4.5 h-4.5 text-[#FF9F1C]" /> Delivery & Shipping Configurations
//         </h3>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col gap-1">
//             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Standard Delivery Fee ($)</label>
//             <input
//               type="number"
//               step="0.10"
//               value={fees.deliveryFee}
//               onChange={(e) => setFees(f => ({ ...f, deliveryFee: parseFloat(e.target.value) || 0 }))}
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF4D6D] text-xs font-bold"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Free Delivery Limit ($)</label>
//             <input
//               type="number"
//               step="1.00"
//               value={fees.freeDeliveryThreshold}
//               onChange={(e) => setFees(f => ({ ...f, freeDeliveryThreshold: parseFloat(e.target.value) || 0 }))}
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF4D6D] text-xs font-bold"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Save Settings */}
//       <button
//         onClick={handleSaveSettings}
//         disabled={loading}
//         className="w-full py-3.5 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white rounded-2xl font-bold text-xs shadow-md flex items-center justify-center gap-2"
//       >
//         {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
//         Save Configurations
//       </button>
//     </div>
//   );
// };

// export default Settings;
