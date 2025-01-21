export interface CampoTextoProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  placeholder: string;
  onChangeText?: (s: string) => void;
}

export default function CampoTexto(props: CampoTextoProps) {
  return (
    <>
      {/* <label className="formulario__label" htmlFor={props.placeholder}>
        {props.placeholder}
      </label> */}
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
