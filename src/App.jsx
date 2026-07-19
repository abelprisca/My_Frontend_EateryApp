import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context Providers
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Menu from "./pages/Menu";



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          <Routes>
  <Route path="/" element={<MainLayout />}>
    {/* Public Routes */}
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="menu" element={<Menu />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="profile" element={<Profile />} />
      {/* Add more protected routes here */}
      {/* <Route path="cart" element={<Cart />} /> */}
      {/* <Route path="orders" element={<Orders />} /> */}
      {/* <Route path="checkout" element={<Checkout />} /> */}
    </Route>
  </Route>
</Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

// // Providers
// import { AuthProvider } from './contexts/AuthContext';
// import { CartProvider } from './contexts/CartContext';

// // Layouts
// import MainLayout from './layouts/MainLayout';
// import AdminLayout from './layouts/AdminLayout';

// // Pages - Storefront
// import Home from './pages/Home';
// import Menu from './pages/Menu';
// import MealDetails from './pages/MealDetails';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Profile from './pages/Profile';
// import Orders from './pages/Orders';

// // Pages - Admin
// import Dashboard from './pages/admin/Dashboard';
// import Analytics from './pages/admin/Analytics';
// import ManageMenu from './pages/admin/ManageMenu';
// import ManageOrders from './pages/admin/ManageOrders';
// import Customers from './pages/admin/Customers';
// import Settings from './pages/admin/Settings';

// export const App = () => {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <CartProvider>
//           {/* Notifications Handler */}
//           <Toaster 
//             position="top-right" 
//             toastOptions={{
//               duration: 3500,
//               style: {
//                 background: '#FFFFFF',
//                 color: '#1F2937',
//                 borderRadius: '16px',
//                 border: '1px solid #FFE5E9',
//                 fontSize: '12px',
//                 fontWeight: '600',
//                 padding: '12px 18px',
//                 boxShadow: '0 4px 12px rgba(255, 77, 109, 0.08)',
//               },
//               success: {
//                 iconTheme: {
//                   primary: '#16A34A',
//                   secondary: '#FFFFFF',
//                 },
//                 style: {
//                   border: '1px solid #DCFCE7',
//                 }
//               },
//               error: {
//                 iconTheme: {
//                   primary: '#DC2626',
//                   secondary: '#FFFFFF',
//                 },
//                 style: {
//                   border: '1px solid #FEE2E2',
//                 }
//               }
//             }} 
//           />

//           <Routes>
//             {/* 1. Client Storefront Routes */}
//             <Route path="/" element={<MainLayout />}>
//               <Route index element={<Home />} />
//               <Route path="about" element={<About />} />
//               <Route path="contact" element={<Contact />} />
//               <Route path="menu" element={<Menu />} />
//               <Route path="menu/:id" element={<MealDetails />} />
//               <Route path="login" element={<Login />} />
//               <Route path="register" element={<Register />} />
              
//               {/* Customer Protected Pages */}
//               <Route path="cart" element={<Cart />} />
//               <Route path="checkout" element={<Checkout />} />
//               <Route path="profile" element={<Profile />} />
//               <Route path="orders" element={<Orders />} />
//             </Route>

//             {/* 2. Admin Operations Routes */}
//             <Route path="/admin" element={<AdminLayout />}>
//               <Route index element={<Dashboard />} />
//               <Route path="analytics" element={<Analytics />} />
//               <Route path="menu" element={<ManageMenu />} />
//               <Route path="orders" element={<ManageOrders />} />
//               <Route path="customers" element={<Customers />} />
//               <Route path="settings" element={<Settings />} />
//             </Route>

//             {/* Fallback Redirection */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </CartProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// };

// export default App;
