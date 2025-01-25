import { IconPhone } from "@tabler/icons-react";

import { Label } from "@/src/components/ui/label";

export interface CampoTelefoneProps
  extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string;
  value: string;
  placeholder: string;
  onChangeText?: (s: string) => void;
  disabled?: boolean;
}

export default function CampoTelefone(props: CampoTelefoneProps) {
  return (
    <div className="outline-none">
      {props?.labelText && (
        <>
          <Label className="formulario__label" htmlFor={props.placeholder}>
            {props.labelText}
          </Label>
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
          disabled={props?.disabled ? true : false}
          className="formulario__input"
        />
        <div>
          <IconPhone className="text-zinc-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
