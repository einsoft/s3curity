import { ReactNode } from "react";

import { Toaster } from "@/src/components/ui/toaster";
import { ProvedorSessao } from "@/src/data/contexts/ContextoSessao";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ProvedorSessao>
      {children}
      <Toaster />
    </ProvedorSessao>
  );
}
