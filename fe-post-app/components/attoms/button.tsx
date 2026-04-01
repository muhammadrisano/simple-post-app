import { cn } from "@/utils/cn";
import React from "react";
interface ButtonProps extends React.ComponentProps<"button"> {
  isLoading?: boolean;
}

const Button = ({ className, isLoading, children, ...props }: ButtonProps) => {
  return (
    <button className={cn("btn", className)} {...props}>
      {isLoading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
};

export default Button;
