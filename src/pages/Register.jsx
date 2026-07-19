//Registring new users

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  UserPlus,
} from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/ui/AnimatedButton';
import ErrorAlert from '../components/ui/ErrorAlert';

export const Register = () => {
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const redirectUrl = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: data.password,
      });
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-xl flex flex-col gap-6"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="h-12 w-12 bg-gradient-to-tr from-[#FF4D6D] to-[#FF9F1C] rounded-2xl flex items-center justify-center shadow-lg shadow-pink-100 mb-2">
            <UserPlus className="text-white w-6 h-6" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Create Account
          </h2>

          <p className="text-xs text-gray-400">
            Join EateryApp to start ordering delicious meals.
          </p>
        </div>

        <ErrorAlert message={apiError} onClose={() => setApiError('')} />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-gray-400" />

              <input
                type="text"
                placeholder="Priscy Priscy"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                  errors.name ? 'border-red-300' : 'border-gray-200'
                } focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('name', {
                  required: 'Full name is required',
                })}
              />
            </div>

            {errors.name && (
              <span className="text-[10px] text-red-500 font-medium">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-gray-400" />

              <input
                type="email"
                placeholder="priscy@gmail.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                } focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>

            {errors.email && (
              <span className="text-[10px] text-red-500 font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Phone Number
            </label>

            <div className="relative">
              <Phone className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-gray-400" />

              <input
                type="tel"
                placeholder="08160170806"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                  errors.phone ? 'border-red-300' : 'border-gray-200'
                } focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('phone', {
                  required: 'Phone number is required',
                })}
              />
            </div>

            {errors.phone && (
              <span className="text-[10px] text-red-500 font-medium">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Address
            </label>

            <div className="relative">
              <MapPin className="absolute top-3.5 left-4 w-4 h-4 text-gray-400" />

              <textarea
                rows={3}
                placeholder="Biu, Borno State"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                  errors.address ? 'border-red-300' : 'border-gray-200'
                } focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold resize-none`}
                {...register('address', {
                  required: 'Address is required',
                })}
              />
            </div>

            {errors.address && (
              <span className="text-[10px] text-red-500 font-medium">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-gray-400" />

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full pl-11 pr-10 py-3 rounded-xl border ${
                  errors.password ? 'border-red-300' : 'border-gray-200'
                } focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {errors.password && (
              <span className="text-[10px] text-red-500 font-medium">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-gray-400" />

              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full pl-11 pr-10 py-3 rounded-xl border ${
                  errors.confirmPassword
                    ? 'border-red-300'
                    : 'border-gray-200'
                } focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('confirmPassword', {
                  required: 'Please confirm password',
                  validate: (val) =>
                    val === passwordValue || 'Passwords do not match',
                })}
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <span className="text-[10px] text-red-500 font-medium">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <AnimatedButton
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 py-3.5"
          >
            {isSubmitting ? 'Registering...' : 'Create Account'}
          </AnimatedButton>
        </form>

        {/* Login Link */}
        <p className="text-xs text-center text-gray-500">
          Already have an account?{' '}
          <Link
            to={`/login?redirect=${encodeURIComponent(redirectUrl)}`}
            className="text-[#FF4D6D] font-extrabold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;