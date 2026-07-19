import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Eye, EyeOff, Lock } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';
import ErrorAlert from '../ui/ErrorAlert';

export const ChangePasswordForm = () => {
  const { changePassword } = useAuth();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      reset();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Password update failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const newPasswordValue = watch('newPassword');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 w-full">
      <div className="flex items-center gap-2 mb-2">
        <Lock className="w-5 h-5 text-[#FF4D6D]" />
        <h3 className="text-base font-bold text-gray-800">Change Password</h3>
      </div>

      <ErrorAlert message={errorMessage} onClose={() => setErrorMessage('')} />

      {/* Current Password */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">Current Password</label>
        <div className="relative">
          <input
            type={showCurrent ? 'text' : 'password'}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl border ${errors.currentPassword ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-sm transition-colors pr-10`}
            {...register('currentPassword', { required: 'Current password is required' })}
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.currentPassword && (
          <span className="text-[11px] text-red-500 font-medium">{errors.currentPassword.message}</span>
        )}
      </div>

      {/* New Password */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">New Password</label>
        <div className="relative">
          <input
            type={showNew ? 'text' : 'password'}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl border ${errors.newPassword ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-sm transition-colors pr-10`}
            {...register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain uppercase, lowercase, and a number'
              }
            })}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.newPassword && (
          <span className="text-[11px] text-red-500 font-medium">{errors.newPassword.message}</span>
        )}
      </div>

      {/* Confirm New Password */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500">Confirm New Password</label>
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl border ${errors.confirmNewPassword ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-sm transition-colors pr-10`}
            {...register('confirmNewPassword', {
              required: 'Please confirm your new password',
              validate: (val) => val === newPasswordValue || 'Passwords do not match'
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmNewPassword && (
          <span className="text-[11px] text-red-500 font-medium">{errors.confirmNewPassword.message}</span>
        )}
      </div>

      <AnimatedButton
        type="submit"
        disabled={isSubmitting}
        className="mt-2 py-3"
      >
        {isSubmitting ? 'Updating...' : 'Update Password'}
      </AnimatedButton>
    </form>
  );
};

export default ChangePasswordForm;
