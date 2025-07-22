import React from "react";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "caption"
  | "small";

type TypographyProps = {
  variant?: Variant;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
};

const styles: Record<Variant, string> = {
  h1: "text-xl mobile:text-2xl font-bold",
  h2: "text-[24px] font-bold",
  h3: "mobile:text-xl desktop:text-3xl font-semibold",
  h4: "mobile:text-lg desktop:text-2xl font-medium",
  h5: "mobile:text-base desktop:text-xl font-medium",
  h6: "mobile:text-sm desktop:text-lg font-medium",
  body: "mobile:text-sm desktop:text-base",
  caption: "mobile:text-xs desktop:text-sm text-gray-500",
  small: "mobile:text-[10px] desktop:text-xs text-gray-400",
};

const elements: Record<Variant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  caption: "span",
  small: "small",
};

export default function Typography({
  variant = "body",
  as,
  className = "",
  children,
}: TypographyProps) {
  const Tag = as || elements[variant];
  const combinedClass = `${styles[variant]} ${className}`.trim();

  return <Tag className={combinedClass}>{children}</Tag>;
}