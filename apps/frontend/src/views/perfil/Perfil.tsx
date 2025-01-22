import Logo from "@/src/components/logo/Logo";
import Cabecalho from "@/src/components/shared/Cabecalho";
import useSessao from "@/src/data/hooks/useSessao";

export default function Perfil() {
  const { usuario } = useSessao();

  return (
    <div className="container">
      <Cabecalho />
      <div className="formulario__container">
        <Logo />
        <span className="formulario__container--logotipo">Olá {usuario?.nomeCompleto}!</span>
      </div>
    </div>
  );
}
