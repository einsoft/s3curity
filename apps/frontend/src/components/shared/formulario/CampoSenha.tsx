import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export interface CampoSenhaProps extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeText?: (s: string) => void;
  disabled?: boolean;
}

export default function CampoSenha(props: CampoSenhaProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function alternarMostrarSenha() {
    setMostrarSenha(!mostrarSenha);
  }

  return (
    <>
      {props?.labelText && (
        <>
          <label className="formulario__label" htmlFor="senha">
            {props.labelText}
          </label>
        </>
      )}
      <div className="formulario__input">
        <input
          id={props.id ? props.id : "senha"}
          type={mostrarSenha ? "text" : "password"}
          value={props.value}
          onChange={(e) => {
            props.onChange?.(e);
            props.onChangeText?.(e.target.value);
          }}
          placeholder={props.placeholder}
          disabled={props?.disabled ? true : false}
          className="formulario__input"
        />
        <div>
          {mostrarSenha ? (
            <IconEyeOff
              onClick={alternarMostrarSenha}
              className="cursor-pointer text-zinc-500"
            />
          ) : (
            <IconEye
              onClick={alternarMostrarSenha}
              className="cursor-pointer text-zinc-500"
            />
          )}
        </div>
      </div>
    </>
  );
}
