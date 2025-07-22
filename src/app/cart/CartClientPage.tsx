"use client";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/CartItem/CartItem";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import Typography from "@/components/Typography/Typography";

export default function CartClientPage() {
  const { state } = useCart();

  if (state.items.length === 0) {
    return (
      <>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Your Cart
        </h1>
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mb-4">
            Start shopping to add items to your cart.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Back to Catalog
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Typography variant="h1" className="text-gray-900 mb-2">
            Your Cart
          </Typography>
          <p className="text-gray-600">{state.itemCount} items</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          ← Back to Catalog
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="flex-1 lg:max-w-none">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {state.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-96 lg:flex-shrink-0">
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
