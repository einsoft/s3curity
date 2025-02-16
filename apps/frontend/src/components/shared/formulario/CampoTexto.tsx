"use client";

import { InputHTMLAttributes } from "react";
import { UserIcon } from "lucide-react";

export interface CampoTextoProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  icon?: boolean;
  required?: boolean;
}

export default function CampoTexto({
  placeholder,
  value,
  onChangeText,
  icon,
  required,
  "aria-label": ariaLabel,
  ...rest
}: CampoTextoProps) {
  return (
    <div className="relative">
      {icon && (
        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      )}
      <input
        type="text"
        className={`w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 ${
          icon ? "pl-10" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        required={required}
        aria-label={ariaLabel}
        {...rest}
      />
    </div>
  );
}
