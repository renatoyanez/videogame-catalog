"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useGames } from "@/contexts/GamesContext";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
}

export const CustomLink = ({
  href,
  children,
  className = "",
  target,
}: CustomLinkProps) => {
  const { resetFilters } = useGames();

  const handleResetFilters = () => {
    if (href === "/") {
      resetFilters();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleResetFilters}
      className={className}
      target={target}
    >
      {children}
    </Link>
  );
};
