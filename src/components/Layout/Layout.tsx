"use client";

import { ReactNode, FC } from "react";
import { layoutClasses } from "./classes";

interface LayoutProps {
  children?: ReactNode;
  type?: "page" | "header";
  className?: string;
}

const Layout: FC<LayoutProps> = ({
  children,
  type = "page",
  className = "",
}) => {
  return (
    <div className={`max-w-7xl ${layoutClasses.container[type]} ${className}`}>{children}</div>
  );
};

export default Layout;
