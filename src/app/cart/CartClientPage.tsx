"use client";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/CartItem/CartItem";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import Typography from "@/components/Typography/Typography";
import { CustomLink } from "@/components/CustomLink/CustomLink";

export default function CartClientPage() {
  const { state } = useCart();

  return (
    <>
      <CustomLink
        href="/"
        className="inline-flex items-center desktop:mb-[48px] mobile:mb-[32px]"
      >
        ← Back to Catalog
      </CustomLink>
      <div>
        <Typography variant="h1" className="text-gray-900 mb-2">
          Your Cart
        </Typography>
        <p className="text-gray-600">{state.itemCount} items</p>
      </div>

      {state.items.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mb-4">
            Start shopping to add items to your cart.
          </p>
          <CustomLink
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Catalog
          </CustomLink>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between lg:gap-48 gap-12">
          <div className="flex-1 lg:max-w-none">
            <div className="bg-white p-6">
              {state.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-96 lg:flex-shrink-0">
            <OrderSummary />
          </div>
        </div>
      )}
    </>
  );
}
