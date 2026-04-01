import { cn } from "@/utils/cn";
import React from "react";
interface InputProps extends React.ComponentProps<"input"> {
    label?: string;
}

const Input = ({className, label, type="text",  ...props}: InputProps) => {
  return (
    <>
       {label && <label className="label text-sm">{label}</label>}
      <input type={type} className={cn("input", className)} {...props} />
    </>
  );
};

export default Input;
