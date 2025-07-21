"use client";

import { ReactNode, FC } from "react";
import { layoutClasses } from "./classes";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <main className={`${layoutClasses.wrapper} ${className}`}>{children}</main>
  );
};

export default Layout;
