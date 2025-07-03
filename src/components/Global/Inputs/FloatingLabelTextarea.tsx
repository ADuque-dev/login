import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FloatingLabelTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  rows?: number;
  register?: UseFormRegister<any>;
  className?: string;
}

const FloatingLabelTextarea: React.FC<FloatingLabelTextareaProps> = ({
  id,
  label,
  placeholder = "",
  rows = 4,
  register,
  className = "",
}) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="absolute left-2 -top-3.5 bg-white px-1 text-gray-500 text-sm"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        {...(register ? register(id) : {})}
        className={`w-full px-2 py-2 border rounded-[4px] border-[#D9D9D9] focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default FloatingLabelTextarea;
