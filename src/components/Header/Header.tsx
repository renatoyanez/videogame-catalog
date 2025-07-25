"use client";

import type React from "react";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import Typography from "@/components/Typography/Typography";
import { CustomLink } from "@/components/CustomLink/CustomLink";
import { useCart } from "@/contexts/CartContext";
import { headerClasses } from "./classes";
import Image from "next/image";

const Header: React.FC = () => {
  const { state } = useCart();

  return (
    <header className={headerClasses.container}>
      <Layout type="header">
        <div className={headerClasses.content}>
          <CustomLink href="/" className={headerClasses.title}>
            <Typography variant="h2" className={headerClasses.title}>
              GamerShop
            </Typography>
          </CustomLink>

          <CustomLink href="/cart" className={headerClasses.cartButton}>
            <Image
              src="/cart-icon.svg"
              alt="Cart Icon"
              width={20}
              height={20}
            />
            {state.itemCount > 0 && (
              <span className={headerClasses.cartBadge}>{state.itemCount}</span>
            )}
          </CustomLink>
        </div>
      </Layout>
    </header>
  );
};

export default Header;
