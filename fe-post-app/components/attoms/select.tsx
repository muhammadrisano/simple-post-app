import { cn } from "@/utils/cn";
import React from "react";

interface SelectProps extends React.ComponentProps<"select"> {
  options: {
    value: string;
    label: string;
  }[];
  label?: string
}

const Select = ({ options, className, label, ...props }: SelectProps) => {
  return (
    <>
    {label && <label className="label text-sm">{label}</label>}
    <select className={cn("select", className)} {...props}>
      <option value="" disabled={true}>--Select--</option>
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    </>
  );
};

export default Select;
