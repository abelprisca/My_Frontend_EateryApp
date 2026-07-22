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
import Menu from "./pages/Menu";
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

// ==========================
// ROUTE GUARDS
// ==========================
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";

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

              <Route index element={<Home />} />

              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<MealDetails />} />

              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* Temporary Public Routes */}

              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<Orders />} />

              {/* Protected Customer Routes */}

              <Route element={<ProtectedRoute />}>

                <Route
                  path="profile"
                  element={<Profile />}
                />

              </Route>

            </Route>

            {/* =====================================================
                          ADMIN PANEL
            ===================================================== */}

            <Route element={<AdminRoute />}>

              <Route
                path="/admin"
                element={<AdminLayout />}
              >

                {/* Redirect /admin -> /admin/analytics */}

                <Route
                  index
                  element={
                    <Navigate
                      to="analytics"
                      replace
                    />
                  }
                />

                {/* Existing Page */}

                <Route
                  path="analytics"
                  element={<Analytics />}
                />

                {/* =====================================================
                            CREATE THESE LATER
                ===================================================== */}

                {/*
                <Route
                  path="orders"
                  element={<AdminOrders />}
                />

                <Route
                  path="menu"
                  element={<AdminMenu />}
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