import { FC } from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
}

const Badge: FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "sm",
  className = "",
}) => {
  const baseClasses = "absolute top-[12px] left-[12px] rounded inline-flex items-center font-medium";

  const variantClasses = {
    default: "bg-[#F5F5F4] text-[#3B3B3B]",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "py-2 px-4 text-[16px]",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return <span className={classes}>{children}</span>;
};

export default Badge;
