"use client";

import { FC } from "react";
import { useCart } from "../../contexts/CartContext";
import { Card, CardHeader, CardContent } from "@/components/Card/Card";
import Button from "@/components/Button/Button";

const OrderSummary: FC = () => {
  const { state } = useCart();

  const subtotal = state.total;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = () => {
    alert("Checkout functionality");
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 mb-4 overflow-y-auto">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2"
            >
              <span className="text-gray-600 text-sm">
                {item.name} (x{item.quantity})
              </span>
              <span className="text-gray-900 font-medium text-sm">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-t border-gray-200 pt-4 mt-4">
            <span className="text-lg font-semibold text-gray-900">
              Order Total
            </span>
            <span className="text-lg font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          disabled={state.items.length === 0}
          className="w-full mt-6"
          size="lg"
        >
          Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
