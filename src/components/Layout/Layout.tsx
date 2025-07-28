"use client";

import { ReactNode, FC } from "react";
import { layoutClasses } from "./classes";

interface LayoutProps {
  children?: ReactNode;
  type?: "page" | "header";
  className?: string;
  backButton?: ReactNode;
}

const Layout: FC<LayoutProps> = ({
  children,
  type = "page",
  className = "",
  backButton = undefined,
}) => {
  return (
    <>
      {backButton && backButton}
      <div
        className={`max-w-7xl ${layoutClasses.container[type]} ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
