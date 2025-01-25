import { Label } from "@/components/ui/label";

export interface CampoTextoProps extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string;
  value: string;
  placeholder: string;
  onChangeText?: (s: string) => void;
  disabled?: boolean;
}

export default function CampoTexto(props: CampoTextoProps) {
  return (
    <div className="outline-none">
      {props.labelText && (
        <Label className="formulario__label" htmlFor={props.placeholder}>
          {props.labelText}
        </Label>
      )}
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
    </div>
  );
}
