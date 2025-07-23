"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { CartState, Game, CartItem } from "@/types/game";
import {
  saveCartToStorage,
  loadCartFromStorage,
  clearCartFromStorage,
} from "@/lib/localStorage";

interface CartContextType {
  state: CartState;
  addToCart: (game: Game) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // memo the updateTotals function to prevent unnecessary re-creations
  const updateTotals = useCallback((cartItems: CartItem[]) => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const newItemCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setTotal(newTotal);
    setItemCount(newItemCount);

    // save to localStorage
    const cartState = {
      items: cartItems,
      total: newTotal,
      itemCount: newItemCount,
    };
    saveCartToStorage(cartState);
  }, []);

  // load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart) {
      setItems(savedCart.items);
      setTotal(savedCart.total);
      setItemCount(savedCart.itemCount);
    }
  }, []);

  const addToCart = useCallback(
    (game: Game) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === game.id);

        let newItems: CartItem[];
        if (existingItem) {
          newItems = prevItems.map((item) =>
            item.id === game.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newItems = [...prevItems, { ...game, quantity: 1 }];
        }

        updateTotals(newItems);
        return newItems;
      });
    },
    [updateTotals]
  );

  const removeFromCart = useCallback(
    (id: number) => {
      setItems((prevItems) => {
        const newItems = prevItems.filter((item) => item.id !== id);
        updateTotals(newItems);
        return newItems;
      });
    },
    [updateTotals]
  );

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      setItems((prevItems) => {
        const newItems = prevItems
          .map((item) =>
            item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
          )
          .filter((item) => item.quantity > 0);

        updateTotals(newItems);
        return newItems;
      });
    },
    [updateTotals]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setTotal(0);
    setItemCount(0);
    clearCartFromStorage();
  }, []);

  // Memoize the state
  const state: CartState = useMemo(
    () => ({
      items,
      total,
      itemCount,
    }),
    [items, total, itemCount]
  );

  // Memoize the context
  const contextValue = useMemo(
    () => ({
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [state, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      "Error description, you probably forgot to wrap the app with the provider"
    );
  }
  return context;
};

// memo the safe cart hook return value
export const useCartSafe = () => {
  const context = useContext(CartContext);

  return useMemo(
    () =>
      context ?? {
        state: { items: [], total: 0, itemCount: 0 },
        addToCart: () => {},
        removeFromCart: () => {},
        updateQuantity: () => {},
        clearCart: () => {},
      },
    [context]
  );
};
