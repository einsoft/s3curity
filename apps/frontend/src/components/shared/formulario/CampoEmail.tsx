"use client";

import { InputHTMLAttributes } from "react";
import { MailIcon } from "lucide-react";

export interface CampoEmailProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  required?: boolean;
}

export default function CampoEmail({
  placeholder,
  value,
  onChangeText,
  required,
  "aria-label": ariaLabel,
  ...rest
}: CampoEmailProps) {
  return (
    <div className="relative">
      <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      <input
        type="email"
        className="w-full p-3 pl-10 rounded-lg bg-gray-100 text-[#18181b] focus:ring-black focus:outline-none focus:ring-2"
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
