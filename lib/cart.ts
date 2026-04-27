"use client";

import { createContext, useContext } from "react";

export type ProductSize = "reg" | "lrg";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: ProductSize;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number, size: ProductSize) => void;
  updateQuantity: (id: number, size: ProductSize, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  total: 0,
  itemCount: 0,
});

export function useCart() {
  return useContext(CartContext);
}
