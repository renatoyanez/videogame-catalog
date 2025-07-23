import type React from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { CartProvider } from "@/contexts/CartContext"
import { GamesProvider } from "@/contexts/GamesContext"

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider>
      <GamesProvider>{children}</GamesProvider>
    </CartProvider>
  )
}

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from "@testing-library/react"

// Override render method
export { customRender as render }
