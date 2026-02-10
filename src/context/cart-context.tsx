"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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
  updateQuantity: (medicineId: string, quantity: number) => void;
  removeFromCart: (medicineId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // ✅ Load from localStorage (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) setItems(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  }, []);

  // ✅ Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save cart", err);
    }
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

  const updateQuantity = (medicineId: string, quantity: number) => {
    if (quantity < 1) return;

    setItems((prev) =>
      prev.map((item) =>
        item.medicineId === medicineId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (medicineId: string) => {
    setItems((prev) => prev.filter((i) => i.medicineId !== medicineId));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
