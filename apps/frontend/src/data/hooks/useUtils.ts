import { ChangeEvent, useState } from "react";

type NumeroTelefone = string;
type NumeroFormatado = string;

/**
 * Hook para formatação de números de telefone brasileiros
 * @param valorInicial - Valor inicial no formato (xx)xxxxx-xxxx
 * @returns [valorFormatado, handleChange] - Valor formatado e função de change
 */
interface UseFormatadorTelefoneReturn {
  valorFormatado: NumeroFormatado;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  valorNumerico: NumeroTelefone;
}

function useFormatadorTelefone(
  valorInicial: NumeroTelefone = "",
): UseFormatadorTelefoneReturn {
  const [valor, setValor] = useState<NumeroFormatado>(valorInicial);

  const formatarTelefoneBR = (numero: NumeroTelefone): NumeroFormatado => {
    const numeros = numero.replace(/\D/g, "");

    if (numeros.length <= 2) {
      return `(${numeros}`;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)})${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)})${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
  };

  const limparFormatacao = (numero: NumeroFormatado): NumeroTelefone => {
    return numero.replace(/\D/g, "");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valorAtual = limparFormatacao(e.target.value);
    const valorFormatado = formatarTelefoneBR(valorAtual);
    setValor(valorFormatado);
  };

  return {
    valorFormatado: valor,
    handleChange,
    valorNumerico: limparFormatacao(valor),
  };
}

export default useFormatadorTelefone;
