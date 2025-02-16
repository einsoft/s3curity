"use client";

import { InputHTMLAttributes } from "react";
import { PhoneIcon } from "lucide-react";

export interface CampoTelefoneProps
  extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  required?: boolean;
}

export default function CampoTelefone({
  placeholder,
  value,
  onChangeText,
  required,
  "aria-label": ariaLabel,
  ...rest
}: CampoTelefoneProps) {
  const formatarTelefone = (tel: string) => {
    // Remove tudo que não é número
    const numeros = tel.replace(/\D/g, "");

    // Aplica a máscara conforme o tamanho
    if (numeros.length <= 11) {
      return numeros.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
    }
    return numeros.slice(0, 11); // Limita a 11 dígitos
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatarTelefone(e.target.value);
    onChangeText(formatted);
  };

  return (
    <div className="relative">
      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      <input
        type="tel"
        className="w-full p-3 pl-10 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        aria-label={ariaLabel}
        maxLength={15} // (XX) XXXXX-XXXX
        {...rest}
      />
    </div>
  );
}
