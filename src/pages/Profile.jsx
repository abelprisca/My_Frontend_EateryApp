import { useEffect } from "react";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";
import useAuth from "../hooks/useAuth";

function Profile() {
  const { user, loading, getProfile } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    console.log("User:", user);
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-lg font-semibold text-gray-500">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-red-500 font-semibold">
          Unable to load your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

        <div className="bg-gradient-to-r from-pink-500 to-orange-400 h-32"></div>

        <div className="px-8 pb-8">

          <div className="-mt-14 flex justify-center">
            <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
              <User size={45} className="text-pink-500" />
            </div>
          </div>

          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold">
              {user.name}
            </h1>

            <p className="text-gray-500">
              {user.role}
            </p>
          </div>

          <div className="mt-8 space-y-5">

            <div className="flex items-center gap-4">
              <Mail className="text-pink-500" />
              <div>
                <p className="text-xs text-gray-500">
                  Email
                </p>
                <p className="font-semibold">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-pink-500" />
              <div>
                <p className="text-xs text-gray-500">
                  Phone
                </p>
                <p className="font-semibold">
                  {user.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-pink-500" />
              <div>
                <p className="text-xs text-gray-500">
                  Address
                </p>
                <p className="font-semibold">
                  {user.address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Shield className="text-pink-500" />
              <div>
                <p className="text-xs text-gray-500">
                  Role
                </p>
                <p className="font-semibold">
                  {user.role}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;

// import React from 'react'

// function Profile() {
//   return (
//     <div>Profile</div>
//   )
// }

// export default Profile

// // import React, { useState } from 'react';
// // import { useForm } from 'react-hook-form';
// // import useAuth from '../hooks/useAuth';
// // import apiClient from '../services/api';
// // import ProfileImageUpload from '../components/profile/ProfileImageUpload';
// // import ChangePasswordForm from '../components/profile/ChangePasswordForm';
// // import ProfileStats from '../components/profile/ProfileStats';
// // import { User, Mail, Phone, Calendar, UserCheck } from 'lucide-react';
// // import { motion } from 'framer-motion';
// // import ErrorAlert from '../components/ui/ErrorAlert';
// // import AnimatedButton from '../components/ui/AnimatedButton';

// // export const Profile = () => {
// //   const { user, updateProfile } = useAuth();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [profileError, setProfileError] = useState('');

// //   const {
// //     register,
// //     handleSubmit,
// //     reset,
// //     formState: { errors },
// //   } = useForm({
// //     defaultValues: {
// //       name: user?.name || '',
// //       email: user?.email || '',
// //       phone: user?.phone || '',
// //     }
// //   });

// //   const onSubmit = async (data) => {
// //     setIsSaving(true);
// //     setProfileError('');
// //     try {
// //       /*
// //       // ====================================================
// //       // PRODUCTION API CALL (AXIOS INTEGRATION)
// //       // ====================================================
// //       // To update the profile on your live backend, uncomment:
// //       //
// //       // const response = await apiClient.put(`/users/${user.id}`, data);
// //       // const updatedUser = response.data;
// //       // ====================================================
// //       */

// //       await updateProfile(data);
// //       setIsEditing(false);
// //     } catch (err) {
// //       setProfileError(err.response?.data?.message || 'Profile update failed.');
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };

// //   const handleCancel = () => {
// //     reset({
// //       name: user?.name || '',
// //       email: user?.email || '',
// //       phone: user?.phone || '',
// //     });
// //     setIsEditing(false);
// //   };

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
// //       {/* Page Title */}
// //       <div className="flex items-center gap-3">
// //         <div className="p-3 bg-pink-50 text-[#FF4D6D] rounded-2xl">
// //           <User className="w-6 h-6" />
// //         </div>
// //         <div>
// //           <h1 className="text-2xl sm:text-3xl font-black text-gray-800">My Profile Dashboard</h1>
// //           <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">
// //             Manage your account settings, credentials and view performance statistics
// //           </p>
// //         </div>
// //       </div>

// //       {/* Analytics Row */}
// //       <ProfileStats />

// //       {/* Profile Detail Content Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
// //         {/* Left Col: Photo Upload */}
// //         <div className="md:col-span-1 flex flex-col gap-6">
// //           <ProfileImageUpload />

// //           {/* Account detail meta */}
// //           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 text-xs text-gray-500">
// //             <h4 className="font-bold text-gray-800">Membership details</h4>
// //             <div className="flex items-center gap-2">
// //               <Calendar className="w-4 h-4 text-[#7B61FF]" />
// //               <span>Joined: {user?.joined || 'N/A'}</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <UserCheck className="w-4 h-4 text-green-500" />
// //               <span>Account Type: <span className="font-bold text-gray-700 capitalize">{user?.role}</span></span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Col: Personal Info Form & Security */}
// //         <div className="md:col-span-2 flex flex-col gap-8">
          
// //           {/* General Fields Form */}
// //           <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
// //             <div className="flex justify-between items-center border-b border-gray-50 pb-3 mb-1">
// //               <h3 className="text-base font-bold text-gray-800">Personal Information</h3>
// //               {!isEditing ? (
// //                 <button
// //                   type="button"
// //                   onClick={() => setIsEditing(true)}
// //                   className="px-4 py-1.5 border border-pink-200 text-[#FF4D6D] hover:bg-[#FFF7F8] rounded-xl text-xs font-bold transition-all"
// //                 >
// //                   Edit Details
// //                 </button>
// //               ) : (
// //                 <div className="flex gap-2">
// //                   <button
// //                     type="button"
// //                     onClick={handleCancel}
// //                     disabled={isSaving}
// //                     className="px-3 py-1.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-xl text-xs font-bold transition-all"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <AnimatedButton
// //                     type="submit"
// //                     disabled={isSaving}
// //                     className="px-4 py-1.5 text-xs !rounded-xl !h-auto !py-1.5"
// //                   >
// //                     {isSaving ? 'Saving...' : 'Save'}
// //                   </AnimatedButton>
// //                 </div>
// //               )}
// //             </div>

// //             <ErrorAlert message={profileError} onClose={() => setProfileError('')} />

// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //               {/* Full Name */}
// //               <div className="flex flex-col gap-1">
// //                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
// //                 <div className="relative">
// //                   <User className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     disabled={!isEditing}
// //                     className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.name ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold disabled:bg-gray-50 disabled:text-gray-500`}
// //                     {...register('name', { required: 'Full name is required' })}
// //                   />
// //                 </div>
// //                 {errors.name && <span className="text-[10px] text-red-500 font-medium">{errors.name.message}</span>}
// //               </div>

// //               {/* Email */}
// //               <div className="flex flex-col gap-1">
// //                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
// //                 <div className="relative">
// //                   <Mail className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-gray-400" />
// //                   <input
// //                     type="email"
// //                     disabled={!isEditing}
// //                     className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold disabled:bg-gray-50 disabled:text-gray-500`}
// //                     {...register('email', { 
// //                       required: 'Email is required',
// //                       pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
// //                     })}
// //                   />
// //                 </div>
// //                 {errors.email && <span className="text-[10px] text-red-500 font-medium">{errors.email.message}</span>}
// //               </div>

// //               {/* Phone */}
// //               <div className="flex flex-col gap-1">
// //                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
// //                 <div className="relative">
// //                   <Phone className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-gray-400" />
// //                   <input
// //                     type="tel"
// //                     disabled={!isEditing}
// //                     className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.phone ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold disabled:bg-gray-50 disabled:text-gray-500`}
// //                     {...register('phone', { required: 'Phone number is required' })}
// //                   />
// //                 </div>
// //                 {errors.phone && <span className="text-[10px] text-red-500 font-medium">{errors.phone.message}</span>}
// //               </div>
// //             </div>
// //           </form>

// //           {/* Password Security Form */}
// //           <ChangePasswordForm />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;
