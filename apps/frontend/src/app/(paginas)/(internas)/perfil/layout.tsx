"use client";

import Cabecalho from "@/src/components/shared/Cabecalho";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col mt-12">
      <Cabecalho />
      <div className="flex flex-1 flex-row">
        <main className="flex-1">{children}</main>
        <nav className="order-first w-64 bg-black/60">
          <div className="ml-3 rounded-l-lg bg-[#121212] p-2">Listar</div>
          <div className="ml-3 rounded-l-lg p-2">Adicionar</div>
        </nav>
      </div>
    </div>
  );
}
