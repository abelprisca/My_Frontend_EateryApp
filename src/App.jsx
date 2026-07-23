import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ==========================
// CONTEXT PROVIDERS
// ==========================
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// ==========================
// LAYOUTS
// ==========================
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// ==========================
// PUBLIC PAGES
// ==========================
import Home from "./pages/Home";
import CustomerMenu from "./pages/Menu";
import MealDetails from "./pages/MealDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

// ==========================
// ADMIN PAGES
// ==========================
import Analytics from "./pages/admin/Analytics";
import ManageMenu from "./pages/admin/ManageMenu";

// ==========================
// ROUTE GUARDS
// ==========================
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import ManageOrders from "./pages/admin/ManageOrders";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "14px",
                fontSize: "14px",
                fontWeight: "600",
              },
            }}
          />

          <Routes>

            {/* =====================================================
                        CUSTOMER WEBSITE
            ===================================================== */}

            <Route element={<MainLayout />}>

              {/* Home */}
              <Route index element={<Home />} />

              {/* Public Menu */}
              <Route path="menu" element={<CustomerMenu />} />
              <Route path="menu/:id" element={<MealDetails />} />

              {/* Public Pages */}
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />

              {/* Authentication */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* Protected Customer Pages */}
              <Route element={<ProtectedRoute />}>

                <Route
                  path="profile"
                  element={<Profile />}
                />

                <Route
                  path="cart"
                  element={<Cart />}
                />

                <Route
                  path="checkout"
                  element={<Checkout />}
                />

                <Route
                  path="orders"
                  element={<Orders />}
                />

              </Route>

            </Route>

            {/* =====================================================
                          ADMIN PANEL only
            ===================================================== */}

            <Route element={<AdminRoute />}>

              <Route
                path="/admin"
                element={<AdminLayout />}
              >

                {/* Redirect /admin to analytics */}

                <Route
                  index
                  element={<Navigate to="analytics" replace />}
                />

                {/* Dashboard */}

                <Route
                  path="analytics"
                  element={<Analytics />}
                />

                {/* Menu Management */}

                <Route
                  path="menu"
                  element={<ManageMenu />}
                />
                <Route
  path="/admin/orders"
  element={<ManageOrders />}
/>

                {/* Future Pages */}

                {/*
                <Route
                  path="orders"
                  element={<AdminOrders />}
                />

                <Route
                  path="customers"
                  element={<Customers />}
                />

                <Route
                  path="reviews"
                  element={<Reviews />}
                />

                <Route
                  path="settings"
                  element={<Settings />}
                />
                */}

              </Route>

            </Route>

            {/* =====================================================
                              404
            ===================================================== */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;