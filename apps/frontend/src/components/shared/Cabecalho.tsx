"use Client";

import Link from "next/link";

import useSessao from "@/src/data/hooks/useSessao";
import Logo from "./logo/Logo";
import MenuUsuario from "./MenuUsuario";

export default function Cabecalho() {
  const { usuario } = useSessao();
  return (
    <header className="cabecalho__container">
      <nav className="cabecalho__container-items">
        <div className="mt-2">
          <Link href="/">
            <Logo width={60} priority />
          </Link>
        </div>
        <div className="cabecalho__container-itemsAlinhamentoDireita">
          {usuario ? <MenuUsuario /> : <Link href="/entrar">Entrar</Link>}
        </div>
      </nav>
    </header>
  );
}
