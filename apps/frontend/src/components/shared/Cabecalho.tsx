"use Client";

import Link from "next/link";

import useSessao from "@/src/data/hooks/useSessao";
import MenuUsuario from "./MenuUsuario";

export default function Cabecalho() {
  const { usuario } = useSessao();
  return (
    <header className="cabecalhoContainer">
      <nav className="cabecalhoItems">
        <div>&nbsp;</div>
        <div className="cabecalhoItemsAlinhamentoDireita">
          {usuario ? <MenuUsuario /> : <Link href="/entrar">Entrar</Link>}
        </div>
      </nav>
    </header>
  );
}
