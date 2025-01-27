"use client";

import Cabecalho from "@/src/components/shared/Cabecalho";
import MenuSidebar from "@/src/components/shared/MenuSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col mt-12">
      <header>
        <Cabecalho />
      </header>

      <div className="flex-1 flex flex-col sm:flex-row">
        <main className="flex-1 p-4">{children}</main>
        <nav className="order-first sm:w-64">
          <MenuSidebar />
        </nav>
      </div>
    </div>
  );
}
