"use client";

import Cabecalho from "@/src/components/shared/Cabecalho";
import MenuSidebar from "@/src/components/shared/MenuSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Cabecalho />
      </header>
      <div className="mt-12 flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col sm:flex-row">
          <main className="flex-1 bg-[#a1a1aa1a] p-4">{children}</main>
          <nav className="order-first sm:w-64">
            <MenuSidebar />
          </nav>
        </div>
      </div>
    </>
  );
}
