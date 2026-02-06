"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

/* =====================
   Types
===================== */

export type CartItem = {
  medicineId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (medicineId: string) => void;
  clearCart: () => void;
};

/* =====================
   Context
===================== */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* =====================
   Provider
===================== */

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Initialize from localStorage on first render
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.medicineId === item.medicineId);

      if (existing) {
        return prev.map((i) =>
          i.medicineId === item.medicineId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (medicineId: string) => {
    setItems((prev) => prev.filter((item) => item.medicineId !== medicineId));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* =====================
   Hook
===================== */

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
