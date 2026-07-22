import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Lock, Mail, Eye, EyeOff, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/ui/AnimatedButton';
import ErrorAlert from '../components/ui/ErrorAlert';

export const Login = () => {
const { login, isAuthenticated, isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const redirectUrl = searchParams.get('redirect') || '/';

  // If already authenticated, redirect immediately
 useEffect(() => {
  if (!isAuthenticated || !user) return;

  if (isAdmin) {
    navigate("/admin/analytics", { replace: true });
  } else {
    navigate(redirectUrl, { replace: true });
  }
}, [
  isAuthenticated,
  isAdmin,
  user,
  navigate,
  redirectUrl,
]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      await login(data.email, data.password);
      // AuthContext will trigger state change, triggering useEffect redirection
    } catch (err) {
      setApiError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-xl flex flex-col gap-6"
      >
        {/* Brand Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="h-12 w-12 bg-gradient-to-tr from-[#FF4D6D] to-[#FF9F1C] rounded-2xl flex items-center justify-center shadow-lg shadow-pink-100 mb-2">
            <KeyRound className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Sign In to EateryApp</h2>
          <p className="text-xs text-gray-400">Welcome back! Please enter your details below.</p>
        </div>

        <ErrorAlert message={apiError} onClose={() => setApiError('')} />

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="customer@eatery.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address format'
                  }
                })}
              />
            </div>
            {errors.email && <span className="text-[10px] text-red-500 font-medium">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Password</label>
              <a href="#" className="text-[10px] font-bold text-[#FF4D6D] hover:underline" onClick={(e) => { e.preventDefault(); alert('Demo password is "Password123!"'); }}>
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute inset-y-0 left-4 my-auto w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full pl-11 pr-10 py-3 rounded-xl border ${errors.password ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:border-[#FF4D6D] text-xs font-semibold`}
                {...register('password', {
                  required: 'Password is required'
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <span className="text-[10px] text-red-500 font-medium">{errors.password.message}</span>}
          </div>

          {/* Submit Button */}
          <AnimatedButton
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 py-3.5"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </AnimatedButton>
        </form>

        {/* Demo Accounts Panel */}
        <div className="bg-[#FFF7F8] border border-pink-50 p-4.5 rounded-2xl flex flex-col gap-2">
          <p className="text-[10px] font-black uppercase text-[#FF4D6D] tracking-widest">Demo Accounts (Test Credentials)</p>
          <div className="flex flex-col gap-1.5 text-[11px] text-gray-500">
            <div>
              <span className="font-bold text-gray-700">Customer:</span> customer@eatery.com <span className="font-semibold text-gray-400">/ Password123!</span>
            </div>
            <div>
              <span className="font-bold text-gray-700">Admin:</span> admin@eatery.com <span className="font-semibold text-gray-400">/ Password123!</span>
            </div>
          </div>
        </div>

        {/* Signup Redirect */}
        <p className="text-xs text-center text-gray-500">
          Don't have an account?{' '}
          <Link to={`/register?redirect=${encodeURIComponent(redirectUrl)}`} className="text-[#FF4D6D] font-extrabold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
