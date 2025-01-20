import useSessao from "@/src/data/hooks/useSessao";

export default function MenuUsuario() {
  const { usuario, encerrarSessao } = useSessao();

  return (
    <div className="flex">
      <span>{usuario?.nomeCompleto}</span>
      <span onClick={encerrarSessao}>Sair</span>
    </div>
  );
}
