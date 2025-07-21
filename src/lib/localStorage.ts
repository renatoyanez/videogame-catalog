import type { CartState } from "../types/game"

const CART_STORAGE_KEY = "gamerShop_cart"

export const saveCartToStorage = (cart: CartState): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error)
  }
}

export const loadCartFromStorage = (): CartState | null => {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error)
    return null
  }
}

export const clearCartFromStorage = (): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(CART_STORAGE_KEY)
  } catch (error) {
    console.error("Failed to clear cart from localStorage:", error)
  }
}
