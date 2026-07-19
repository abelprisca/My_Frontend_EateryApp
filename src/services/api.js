import axios from 'axios';
import toast from 'react-hot-toast';

// Create Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('eatery_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Global error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    toast.error(message);

    return Promise.reject(error);
  }
);

// Export Axios instance
export default API;