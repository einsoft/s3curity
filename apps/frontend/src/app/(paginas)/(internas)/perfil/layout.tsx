"use client";

import Link from "next/link";

import Cabecalho from "@/src/components/shared/Cabecalho";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col mt-12">
      <Cabecalho />
      <div className="flex flex-1 flex-row">
        <main className="flex-1">{children}</main>
        <nav className="order-first w-64 bg-black/60 text-right">
          <div className="ml-3 mb-4 rounded-l-lg bg-[#121212] p-2 pr-4">
            <Link href={"/perfil"}>Gerenciar</Link>
          </div>
          <div className="ml-3 mb-4 rounded-l-lg bg-[#121212] p-2 pr-4">
            <Link href={"/perfil/adicionar"}>Visualizar</Link>
          </div>
          <div className="ml-3 mb-4 rounded-l-lg bg-[#121212] p-2 pr-4">
            <Link href={"/perfil/adicionar"}>Relatórios</Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
