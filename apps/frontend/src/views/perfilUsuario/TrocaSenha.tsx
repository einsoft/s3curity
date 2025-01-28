import Cabecalho from "@/src/components/shared/Cabecalho";
import CampoEmail from "@/src/components/shared/formulario/CampoEmail";
import Logo from "@/src/components/shared/logo/Logo";
import useSessao from "@/src/data/hooks/useSessao";

export default function TrocaSenha() {
  const { usuario } = useSessao();

  const submeter = () => {
    console.log("Submetendo...");
  };

  return (
    <div className="container">
      <Cabecalho />
      <div className="formulario__container gap-4">
        <Logo />
        <span className="formulario__container-logotipo">
          Solicitar troca de senha
        </span>
        <CampoEmail placeholder="E-mail" value={usuario ? usuario.email : ""} />
        <button onClick={submeter} className="form__button-green">
          Enviar
        </button>
      </div>
    </div>
  );
}
