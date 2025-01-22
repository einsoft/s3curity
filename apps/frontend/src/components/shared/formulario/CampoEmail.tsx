import { IconMail } from "@tabler/icons-react";

export interface CampoEmailProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  value: string;
  placeholder: string;
  onChangeText?: (s: string) => void;
}

export default function CampoEmail(props: CampoEmailProps) {
  return (
    <>
      {props?.label && (
        <>
          <label className="formulario__label" htmlFor="senha">
            {props.label}
          </label>
        </>
      )}
      <div className="formulario__input">
        <input
          id={props.placeholder}
          type="text"
          value={props.value}
          onChange={(e) => {
            props.onChange?.(e);
            props.onChangeText?.(e.target.value);
          }}
          placeholder={props.placeholder}
          className="formulario__input"
        />
        <div>
          <IconMail className="text-zinc-500" />
        </div>
      </div>
    </>
  );
}
