import Logo from "@/src/components/logo/Logo";
import useSessao from "@/src/data/hooks/useSessao";

export default function Perfil() {
  const { usuario } = useSessao();

  return (
    <div className="container">
      <div className="formulario__container">
        <Logo />
        <span className="formulario__container--logotipo">Olá {usuario?.nomeCompleto}!</span>
      </div>
    </div>
  );
}
