"use client";

import { useState, useCallback, useMemo, type ReactNode } from "react";
import { CartContext, type CartItem, type ProductSize } from "./cart";

function matchItem(a: CartItem, id: number, size: ProductSize) {
  return a.id === id && a.size === size;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      setItems((prev) => {
        const existing = prev.find((i) => matchItem(i, item.id, item.size));
        if (existing) {
          return prev.map((i) =>
            matchItem(i, item.id, item.size)
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
    },
    []
  );

  const removeItem = useCallback((id: number, size: ProductSize) => {
    setItems((prev) => prev.filter((i) => !matchItem(i, id, size)));
  }, []);

  const updateQuantity = useCallback(
    (id: number, size: ProductSize, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => !matchItem(i, id, size)));
        return;
      }
      setItems((prev) =>
        prev.map((i) => (matchItem(i, id, size) ? { ...i, quantity } : i))
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, total, itemCount]
  );

  return <CartContext value={value}>{children}</CartContext>;
}
