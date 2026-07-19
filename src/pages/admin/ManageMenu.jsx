import React from 'react'

function ManageMenu() {
  return (
    <div>ManageMenu</div>
  )
}

export default ManageMenu

// import React, { useState, useEffect } from 'react';
// import apiClient, { mockApi } from '../../services/api';
// import { useForm } from 'react-hook-form';
// import { 
//   Plus, Edit, Trash2, CheckCircle2, X, AlertCircle, Sparkles, Image, RefreshCw 
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import toast from 'react-hot-toast';
// import ConfirmModal from '../../components/ui/ConfirmModal';
// import ErrorAlert from '../../components/ui/ErrorAlert';

// export const ManageMenu = () => {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Modals state
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingMeal, setEditingMeal] = useState(null); // null means "Create" mode
//   const [mealToDelete, setMealToDelete] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [formError, setFormError] = useState('');

//   const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

//   const fetchMeals = async () => {
//     try {
//       /*
//       // ====================================================
//       // PRODUCTION API CALL (AXIOS INTEGRATION)
//       // ====================================================
//       // To pull meals from your backend, uncomment:
//       //
//       // const response = await apiClient.get('/admin/meals');
//       // setMeals(response.data);
//       // ====================================================
//       */

//       const data = await mockApi.meals.getAll();
//       setMeals(data);
//     } catch (err) {
//       toast.error('Failed to load menu items.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMeals();
//   }, []);

//   // Open Form modal in edit/create modes
//   const handleOpenForm = (meal = null) => {
//     setFormError('');
//     if (meal) {
//       setEditingMeal(meal);
//       setValue('name', meal.name);
//       setValue('category', meal.category);
//       setValue('price', meal.price);
//       setValue('image', meal.image);
//       setValue('description', meal.description);
//       setValue('ingredients', meal.ingredients.join(', '));
//       setValue('spicy', meal.spicy);
//       setValue('available', meal.available);
//     } else {
//       setEditingMeal(null);
//       reset({
//         name: '',
//         category: 'Rice Dishes',
//         price: '',
//         image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
//         description: '',
//         ingredients: '',
//         spicy: false,
//         available: true,
//       });
//     }
//     setIsFormOpen(true);
//   };

//   // Submit form (Save / Create)
//   const onSubmit = async (data) => {
//     setFormError('');
//     const ingredientsArr = data.ingredients
//       ? data.ingredients.split(',').map(s => s.trim()).filter(Boolean)
//       : [];

//     const payload = {
//       name: data.name,
//       category: data.category,
//       price: parseFloat(data.price),
//       image: data.image,
//       description: data.description,
//       ingredients: ingredientsArr,
//       spicy: data.spicy,
//       available: data.available,
//     };

//     try {
//       if (editingMeal) {
//         /*
//         // ====================================================
//         // PRODUCTION API CALL (AXIOS INTEGRATION)
//         // ====================================================
//         // To update a meal on your live backend, uncomment:
//         //
//         // await apiClient.put(`/admin/meals/${editingMeal.id}`, payload);
//         // ====================================================
//         */
//         await mockApi.meals.update(editingMeal.id, payload);
//         toast.success(`${payload.name} updated successfully!`);
//       } else {
//         /*
//         // ====================================================
//         // PRODUCTION API CALL (AXIOS INTEGRATION)
//         // ====================================================
//         // To create a meal on your live backend, uncomment:
//         //
//         // await apiClient.post('/admin/meals', payload);
//         // ====================================================
//         */
//         await mockApi.meals.create(payload);
//         toast.success(`${payload.name} created successfully!`);
//       }
//       setIsFormOpen(false);
//       fetchMeals();
//     } catch (err) {
//       setFormError(err.response?.data?.message || 'Failed to save meal item.');
//     }
//   };

//   // Trigger Deletion
//   const handleDeleteConfirm = async () => {
//     if (!mealToDelete) return;
//     setIsDeleting(true);
//     try {
//       /*
//       // ====================================================
//       // PRODUCTION API CALL (AXIOS INTEGRATION)
//       // ====================================================
//       // To delete a meal on your live backend, uncomment:
//       //
//       // await apiClient.delete(`/admin/meals/${mealToDelete.id}`);
//       // ====================================================
//       */
//       await mockApi.meals.delete(mealToDelete.id);
//       toast.success(`${mealToDelete.name} deleted.`);
//       setMealToDelete(null);
//       fetchMeals();
//     } catch (err) {
//       toast.error('Failed to delete meal.');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // Toggle meal availability in one click
//   const handleToggleAvailable = async (meal) => {
//     try {
//       /*
//       // ====================================================
//       // PRODUCTION API CALL (AXIOS INTEGRATION)
//       // ====================================================
//       // To toggle availability on your live backend, uncomment:
//       //
//       // const response = await apiClient.put(`/admin/meals/${meal.id}/availability`, { available: !meal.available });
//       // const updated = response.data;
//       // ====================================================
//       */

//       const updated = await mockApi.meals.update(meal.id, { available: !meal.available });
//       setMeals(prev => prev.map(m => m.id === meal.id ? updated : m));
//       toast.success(`${meal.name} availability toggled!`);
//     } catch (err) {
//       toast.error('Failed to toggle status.');
//     }
//   };

//   const filteredMeals = meals.filter(m => 
//     m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     m.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col gap-8">
//       {/* Action Row */}
//       <section className="bg-white p-5 rounded-3xl border border-gray-150 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
//         {/* Search */}
//         <div className="relative w-full sm:max-w-xs">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search menu items..."
//             className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-150 rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#FF4D6D] transition-colors"
//           />
//         </div>

//         <button
//           onClick={() => handleOpenForm()}
//           className="px-5 py-2.5 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] hover:opacity-95 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1.5 shrink-0"
//         >
//           <Plus className="w-4 h-4" />
//           Add New Meal
//         </button>
//       </section>

//       {/* Meals Table List */}
//       <section className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm">
//         {loading ? (
//           <div className="p-8 text-center flex items-center justify-center gap-2">
//             <RefreshCw className="w-5 h-5 animate-spin text-[#FF4D6D]" />
//             <span className="text-xs text-gray-500 font-bold">Synchronizing Database...</span>
//           </div>
//         ) : filteredMeals.length === 0 ? (
//           <div className="p-12 text-center text-xs text-gray-400 font-bold">
//             No meal items found. Add some dishes to get started!
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase text-gray-400">
//                   <th className="py-4 px-6">Meal Details</th>
//                   <th className="py-4 px-6">Category</th>
//                   <th className="py-4 px-6">Price</th>
//                   <th className="py-4 px-6 text-center">Spicy</th>
//                   <th className="py-4 px-6 text-center">Available</th>
//                   <th className="py-4 px-6 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
//                 {filteredMeals.map((meal) => (
//                   <tr key={meal.id} className="hover:bg-[#FFF7F8]/20 transition-colors">
//                     {/* Details Column */}
//                     <td className="py-4 px-6 flex items-center gap-3">
//                       <img src={meal.image} alt={meal.name} className="w-10 h-10 rounded-lg object-cover border shrink-0" />
//                       <div className="overflow-hidden">
//                         <p className="font-extrabold text-gray-800 truncate max-w-[200px]">{meal.name}</p>
//                         <p className="text-[10px] text-gray-400 truncate max-w-[180px] mt-0.5">{meal.description}</p>
//                       </div>
//                     </td>
                    
//                     {/* Category */}
//                     <td className="py-4 px-6 font-bold text-gray-500">{meal.category}</td>

//                     {/* Price */}
//                     <td className="py-4 px-6 font-black text-gray-800">${meal.price.toFixed(2)}</td>

//                     {/* Spicy */}
//                     <td className="py-4 px-6 text-center">
//                       {meal.spicy ? (
//                         <span className="text-red-500 font-bold bg-red-50 border border-red-100 px-2 py-0.5 rounded text-[10px]">Yes 🔥</span>
//                       ) : (
//                         <span className="text-gray-400">No</span>
//                       )}
//                     </td>

//                     {/* Available */}
//                     <td className="py-4 px-6 text-center">
//                       <button
//                         onClick={() => handleToggleAvailable(meal)}
//                         className={`font-black text-[10px] px-3 py-1 rounded-full uppercase border shadow-sm transition-all ${
//                           meal.available 
//                             ? 'bg-green-50 text-green-600 border-green-150 hover:bg-green-100' 
//                             : 'bg-red-50 text-red-500 border-red-150 hover:bg-red-100'
//                         }`}
//                       >
//                         {meal.available ? 'In Stock' : 'Out'}
//                       </button>
//                     </td>

//                     {/* Actions */}
//                     <td className="py-4 px-6 text-right">
//                       <div className="flex justify-end gap-2.5">
//                         <button
//                           onClick={() => handleOpenForm(meal)}
//                           className="p-2 border border-gray-150 text-gray-500 hover:text-[#7B61FF] hover:bg-purple-50 rounded-xl transition-all"
//                           title="Edit Meal"
//                         >
//                           <Edit className="w-3.5 h-3.5" />
//                         </button>
//                         <button
//                           onClick={() => setMealToDelete(meal)}
//                           className="p-2 border border-red-100 text-red-600 hover:bg-red-50 rounded-xl transition-all"
//                           title="Delete Meal"
//                         >
//                           <Trash2 className="w-3.5 h-3.5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>

//       {/* 1. Add / Edit Meal Form Modal */}
//       <AnimatePresence>
//         {isFormOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsFormOpen(false)}
//               className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-xs"
//             />

//             {/* Modal Body */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 overflow-hidden z-10 border border-pink-50 relative flex flex-col gap-5 max-h-[90vh]"
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between border-b pb-3 shrink-0">
//                 <h3 className="font-extrabold text-sm text-gray-800 flex items-center gap-1.5">
//                   <Sparkles className="w-4 h-4 text-[#FF4D6D]" />
//                   {editingMeal ? `Modify ${editingMeal.name}` : 'Add Chef Special Meal'}
//                 </h3>
//                 <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-50 rounded-full">
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Scrollable form fields */}
//               <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto pr-1 flex flex-col gap-4 no-scrollbar">
//                 <ErrorAlert message={formError} onClose={() => setFormError('')} />

//                 {/* Name */}
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Meal Name</label>
//                   <input
//                     type="text"
//                     className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-xs`}
//                     {...register('name', { required: 'Meal name is required' })}
//                   />
//                   {errors.name && <span className="text-[10px] text-red-500">{errors.name.message}</span>}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   {/* Category */}
//                   <div className="flex flex-col gap-1">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</label>
//                     <select
//                       className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF4D6D] text-xs"
//                       {...register('category')}
//                     >
//                       <option value="Rice Dishes">Rice Dishes</option>
//                       <option value="Pasta">Pasta</option>
//                       <option value="Burgers & Fast Food">Burgers & Fast Food</option>
//                       <option value="Salads & Healthy">Salads & Healthy</option>
//                       <option value="Appetizers">Appetizers</option>
//                       <option value="Drinks & Mocktails">Drinks & Mocktails</option>
//                       <option value="Desserts & Sweet">Desserts & Sweet</option>
//                     </select>
//                   </div>

//                   {/* Price */}
//                   <div className="flex flex-col gap-1">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price ($ USD)</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       className={`w-full px-4 py-2.5 rounded-xl border ${errors.price ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-xs`}
//                       {...register('price', { required: 'Price is required', min: { value: 0.1, message: 'Must be positive' } })}
//                     />
//                     {errors.price && <span className="text-[10px] text-red-500">{errors.price.message}</span>}
//                   </div>
//                 </div>

//                 {/* Image URL */}
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Image Unsplash URL</label>
//                   <div className="relative">
//                     <Image className="absolute inset-y-0 left-3.5 my-auto w-4 h-4 text-gray-400" />
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF4D6D] text-xs"
//                       {...register('image')}
//                     />
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</label>
//                   <textarea
//                     rows={3}
//                     className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF4D6D] text-xs"
//                     {...register('description')}
//                   />
//                 </div>

//                 {/* Ingredients (comma separated) */}
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ingredients (Comma Separated)</label>
//                   <input
//                     type="text"
//                     placeholder="E.g. Rice, Bell Pepper, Chicken, Thyme"
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF4D6D] text-xs"
//                     {...register('ingredients')}
//                   />
//                 </div>

//                 {/* Checkboxes: Spicy & Available */}
//                 <div className="flex items-center gap-6 mt-2 border-t pt-4 shrink-0">
//                   <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 accent-[#FF4D6D]"
//                       {...register('spicy')}
//                     />
//                     Spicy Dish 🔥
//                   </label>

//                   <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 accent-green-600"
//                       {...register('available')}
//                     />
//                     In Stock / Available
//                   </label>
//                 </div>

//                 {/* Submit Row */}
//                 <div className="flex justify-end gap-3 mt-4 border-t pt-4 shrink-0">
//                   <button
//                     type="button"
//                     onClick={() => setIsFormOpen(false)}
//                     className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-500"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-2 bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white font-bold text-xs rounded-xl shadow-md"
//                   >
//                     {editingMeal ? 'Update Meal' : 'Create Meal'}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* 2. Deletion Confirm Modal */}
//       <ConfirmModal
//         isOpen={!!mealToDelete}
//         onClose={() => setMealToDelete(null)}
//         onConfirm={handleDeleteConfirm}
//         title="Confirm Meal Deletion"
//         message={`Are you sure you want to permanently delete "${mealToDelete?.name}" from the EateryApp menu database? This action is irreversible.`}
//         confirmText="Delete permanently"
//         loading={isDeleting}
//       />
//     </div>
//   );
// };

// export default ManageMenu;
