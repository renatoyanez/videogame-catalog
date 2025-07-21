import type { Metadata } from "next"
import CartClientPage from "./CartClientPage"

export const metadata: Metadata = {
  title: "Your Cart - GamerShop",
  description: "Review your selected games and proceed to checkout",
}

export default function CartPage() {
  return <CartClientPage />
}
