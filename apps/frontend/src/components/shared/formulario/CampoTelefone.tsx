export interface CampoTelefoneProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  placeholder: string;
  onChangeText?: (s: string) => void;
}

export default function CampoTelefone(props: CampoTelefoneProps) {
  return (
    <>
      <label className="labelFormLogin" htmlFor={props.placeholder}>
        {props.placeholder}
      </label>
      <input
        id={props.placeholder}
        type="text"
        value={props.value}
        onChange={(e) => {
          props.onChange?.(e);
          props.onChangeText?.(e.target.value);
        }}
        placeholder={props.placeholder}
        className="inputFormLogin"
      />
    </>
  );
}
