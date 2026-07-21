import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("eatery_cart");

    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "eatery_cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // ======================
  // ADD TO CART
  // ======================

  const addToCart = (meal, quantity = 1) => {
    if (!isAuthenticated) {
      setLoginPromptOpen(true);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item._id === meal._id
      );

      if (existing) {
        return prev.map((item) =>
          item._id === meal._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...meal,
          quantity,
          savedForLater: false,
        },
      ];
    });
  };

  // ======================
  // REMOVE
  // ======================

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // ======================
  // UPDATE QUANTITY
  // ======================

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: qty,
            }
          : item
      )
    );
  };

  // ======================
  // SAVE FOR LATER
  // ======================

  const toggleSaveForLater = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              savedForLater: !item.savedForLater,
            }
          : item
      )
    );
  };

  // ======================
  // CLEAR
  // ======================

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("eatery_cart");
  };

  // ======================
  // ACTIVE ITEMS
  // ======================

  const activeItems = cartItems.filter(
    (item) => !item.savedForLater
  );

  // ======================
  // SAVED ITEMS
  // ======================

  const savedItems = cartItems.filter(
    (item) => item.savedForLater
  );

  // ======================
  // SUBTOTAL
  // ======================

  const subtotal = activeItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  // ======================
  // DELIVERY
  // ======================

  const deliveryFee =
    subtotal >= 50000 || subtotal === 0
      ? 0
      : 2500;

  // ======================
  // TOTAL
  // ======================

  const total = subtotal + deliveryFee;

  const totalItemsCount = activeItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        activeItems,
        savedItems,
        subtotal,
        deliveryFee,
        total,
        totalItemsCount,
        loginPromptOpen,
        setLoginPromptOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSaveForLater,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
