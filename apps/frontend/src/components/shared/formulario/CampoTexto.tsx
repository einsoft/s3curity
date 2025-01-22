export interface CampoTextoProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  value: string;
  placeholder: string;
  onChangeText?: (s: string) => void;
}

export default function CampoTexto(props: CampoTextoProps) {
  return (
    <>
      {props?.label && (
        <>
          <label className="formulario__label" htmlFor="senha">
            {props.label}
          </label>
        </>
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
      />
    </>
  );
}
