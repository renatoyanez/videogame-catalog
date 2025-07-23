import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart - GamerShop",
  description: "Review your selected games and proceed to checkout",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
