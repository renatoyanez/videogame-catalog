"use client"

import type React from "react"
import Image from "next/image"
import type { CartItem as CartItemType } from "../../types/game"
import { useCart } from "../../contexts/CartContext"
import Button from "@/components/Button/Button"
import Badge from "@/components/Badge/Badge"

interface CartItemProps {
  item: CartItemType
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {  
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className="flex items-start space-x-4 py-6 border-b border-gray-200 last:border-b-0 relative">
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 80px, 96px"
        />
        {item.isNew && (
          <div className="absolute -top-1 -left-1">
            <Badge variant="success" size="sm">
              New
            </Badge>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-400 hover:text-red-600 text-lg font-bold transition-colors p-1"
            aria-label="Remove item"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-2">{item.genre}</p>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
        <p className="text-sm text-gray-600 mb-3">${item.price.toFixed(2)} each</p>

        <div className="flex items-center space-x-2">
          <Button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            size="sm"
            variant="outline"
            className="w-8 h-8 p-0 rounded-full"
          >
            -
          </Button>
          <span className="mx-2 text-sm font-medium min-w-8 text-center">{item.quantity}</span>
          <Button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            size="sm"
            variant="outline"
            className="w-8 h-8 p-0 rounded-full"
          >
            +
          </Button>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-base sm:text-lg font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default CartItem
