import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// ==========================
// CONTEXT PROVIDERS
// ==========================
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// ==========================
// LAYOUT
// ==========================
import MainLayout from "./layouts/MainLayout";

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
// ROUTE GUARD
// ==========================
import ProtectedRoute from "./components/auth/ProtectedRoute";

// ==========================
// OPTIONAL
// ==========================
// import NotFound from "./pages/NotFound";

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

            {/* ==========================
                    MAIN WEBSITE
            ========================== */}

            <Route element={<MainLayout />}>

              {/* Home */}
              <Route index element={<Home />} />

              {/* Public Pages */}
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<MealDetails />} />

              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* =========================================
                    TEMPORARY PUBLIC ROUTES FOR TESTING
                    Move these into ProtectedRoute later
              ========================================== */}

              <Route path="cart" element={<Cart />} />

              <Route path="checkout" element={<Checkout />} />

              <Route path="orders" element={<Orders />} />

              {/* =========================================
                    PROTECTED ROUTES
              ========================================== */}

              <Route element={<ProtectedRoute />}>

                <Route
                  path="profile"
                  element={<Profile />}
                />

                {/* AFTER TESTING MOVE THESE HERE */}

                {/*
                <Route path="cart" element={<Cart />} />

                <Route
                  path="checkout"
                  element={<Checkout />}
                />

                <Route
                  path="orders"
                  element={<Orders />}
                />
                */}

              </Route>

              {/* ==========================
                    404 PAGE
              ========================== */}

              {/* <Route
                path="*"
                element={<NotFound />}
              /> */}

              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />

            </Route>

          </Routes>

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;