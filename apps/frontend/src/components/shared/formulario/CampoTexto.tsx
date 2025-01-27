import { IconTextCaption } from "@tabler/icons-react";

import { Label } from "@/src/components/ui/label";

export interface CampoTextoProps extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string;
  value: string;
  placeholder: string;
  onChangeText?: (s: string) => void;
  disabled?: boolean;
  icon?: boolean;
}

export default function CampoTexto(props: CampoTextoProps) {
  return (
    <div className="outline-none">
      {props.labelText && (
        <Label className="formulario__label" htmlFor={props.placeholder}>
          {props.labelText}
        </Label>
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
          disabled={props?.disabled ? true : false}
        />
        {props.icon && (
          <div>
            <IconTextCaption className="cursor-pointer text-zinc-500" />
          </div>
        )}
      </div>
    </div>
  );
}
