import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import { GamesProvider } from "@/contexts/GamesContext";
import Footer from "@/components/Footer/Footer"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apply Digital Test",
  description: "Frontend development test for Apply Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <GamesProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <Layout>{children}</Layout>
              <Footer />
            </div>
          </GamesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
