import { cn } from "@/utils/cn";
import React from "react";
interface InputProps extends React.ComponentProps<"input"> {
    label?: string;
}

const Input = ({className, label, type="text",  ...props}: InputProps) => {
  return (
    <>
       {label && <label className="label text-sm">{label}</label>}
      <input type={type} className={cn("input aria-invalid:ring aria-invalid:ring-red-600  aria-invalid:border-red-600", className)} {...props} />
    </>
  );
};

export default Input;
