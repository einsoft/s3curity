"use Client";

import Link from "next/link";

import useSessao from "@/src/data/hooks/useSessao";
import MenuUsuario from "./MenuUsuario";

export default function Cabecalho() {
  const { usuario } = useSessao();
  return (
    <header className="flex items-center h-24 bg-black/60 self-stretch">
      <nav className="flex justify-between w-full px-12">
        <div>&nbsp;</div>
        <div className="flex justify-end">{usuario ? <MenuUsuario /> : <Link href="/entrar">Entrar</Link>}</div>
      </nav>
    </header>
  );
}
