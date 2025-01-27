import { IconPhone } from "@tabler/icons-react";

import { Label } from "@/src/components/ui/label";
import useFormatadorTelefone from "@/src/data/hooks/useUtils";

export interface CampoTelefoneProps
  extends React.HTMLAttributes<HTMLDivElement> {
  labelText?: string;
  value: string;
  placeholder: string;
  onChangeText?: (s: string) => void;
  disabled?: boolean;
}

export default function CampoTelefone(props: CampoTelefoneProps) {
  const { valorFormatado, handleChange } = useFormatadorTelefone(props.value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const formattedValue = e.target.value;
    props.onChangeText?.(formattedValue);
  };

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
          value={valorFormatado}
          onChange={handleInputChange}
          placeholder={props.placeholder}
          disabled={props?.disabled ? true : false}
          className="formulario__input"
        />
        <div>
          <IconPhone className="cursor-pointer text-zinc-500" />
        </div>
      </div>
    </div>
  );
}
