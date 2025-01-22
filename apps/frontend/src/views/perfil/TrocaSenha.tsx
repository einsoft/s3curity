import Logo from "@/src/components/logo/Logo";
import CampoEmail from "@/src/components/shared/formulario/CampoEmail";
import useSessao from "@/src/data/hooks/useSessao";

export default function TrocaSenha() {
  const { usuario } = useSessao();

  const submeter = () => {
    console.log("Submetendo...");
  };

  return (
    <div className="container">
      <div className="formulario__container gap-4">
        <Logo />
        <span className="formulario__container--logotipo">Solicitar troca de senha</span>
        <CampoEmail placeholder="E-mail" value={usuario ? usuario.email : ""} />
        <button onClick={submeter} className="form__button--green w-full">
          Enviar
        </button>
      </div>
    </div>
  );
}
