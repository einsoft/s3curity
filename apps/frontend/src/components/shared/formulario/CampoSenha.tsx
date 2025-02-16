"use client";

import { InputHTMLAttributes, useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";

export interface CampoSenhaProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  required?: boolean;
}

export default function CampoSenha({
  placeholder,
  value,
  onChangeText,
  required,
  "aria-label": ariaLabel,
  ...rest
}: CampoSenhaProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="relative">
      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      <input
        type={mostrarSenha ? "text" : "password"}
        className="w-full p-3 pl-10 pr-10 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        required={required}
        aria-label={ariaLabel}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setMostrarSenha(!mostrarSenha)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
      >
        {mostrarSenha ? (
          <EyeOffIcon className="w-5 h-5" />
        ) : (
          <EyeIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
