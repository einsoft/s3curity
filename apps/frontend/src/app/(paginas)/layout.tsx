import { ProvedorSessao } from "@/src/data/contexts/ContextoSessao";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <ProvedorSessao>{children}</ProvedorSessao>;
}
