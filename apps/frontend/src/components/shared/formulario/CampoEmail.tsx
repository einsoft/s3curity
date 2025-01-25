import { IconMail } from "@tabler/icons-react";

import { Label } from "@/src/components/ui/label";

export interface CampoEmailProps extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string;
  value: string;
  placeholder: string;
  onChangeText?: (s: string) => void;
  disabled?: boolean;
}

export default function CampoEmail(props: CampoEmailProps) {
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
          disabled={props?.disabled ? true : false}
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
    </div>
  );
}
