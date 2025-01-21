import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export interface CampoSenhaProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeText?: (s: string) => void;
}

export default function CampoSenha(props: CampoSenhaProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function alternarMostrarSenha() {
    setMostrarSenha(!mostrarSenha);
  }

  return (
    <>
      <label className="formulario__label" htmlFor="senha">
        Senha
      </label>
      <div className="formulario__input">
        <input
          id="senha"
          type={mostrarSenha ? "text" : "password"}
          value={props.value}
          onChange={(e) => {
            props.onChange?.(e);
            props.onChangeText?.(e.target.value);
          }}
          placeholder={props.placeholder}
          className="formulario__input--password"
        />
        <div>
          {mostrarSenha ? (
            <IconEyeOff onClick={alternarMostrarSenha} className="text-zinc-500" />
          ) : (
            <IconEye onClick={alternarMostrarSenha} className="text-zinc-500" />
          )}
        </div>
      </div>
    </>
  );
}
