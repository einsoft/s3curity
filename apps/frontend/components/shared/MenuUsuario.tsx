import useSessao from "@/src/data/hooks/useSessao";

export default function MenuUsuario() {
  const { usuario, encerrarSessao } = useSessao();

  return (
    <div className="flex">
      <nav className="flex justify-between w-full">
        <div className="pr-12">
          <span>{usuario?.nomeCompleto}</span>
        </div>
        <div>
          <button onClick={encerrarSessao}>Sair</button>
        </div>
      </nav>
    </div>
  );
}
