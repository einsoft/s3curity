"use client";

import Cabecalho from "@/src/components/shared/Cabecalho";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col mt-12">
      <Cabecalho />
      <div className="flex flex-1 flex-row">
        <main className="flex-1 p-4">{children}</main>
        <nav className="order-first w-64 bg-black p-4">Navigation</nav>
      </div>
    </div>
  );
}
