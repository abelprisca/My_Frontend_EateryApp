import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('eatery_cart');

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem('eatery_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (meal, quantity = 1) => {
    if (!isAuthenticated) {
      setLoginPromptOpen(true);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === meal._id);

      if (existing) {
        return prev.map((item) =>
          item._id === meal._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...meal, quantity }];
    });
  };

  const removeFromCart = (mealId) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== mealId)
    );
  };

  const updateQuantity = (mealId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === mealId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('eatery_cart');
  };

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    setCartItems,
    loginPromptOpen,
    setLoginPromptOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItemsCount,
    subtotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;