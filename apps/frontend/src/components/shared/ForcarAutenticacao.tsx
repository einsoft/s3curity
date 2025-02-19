"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import useSessao from "@/src/data/hooks/useSessao";
import Processando from "./Processando";

interface PendingOperationsContext {
  registerOperation: () => void;
  unregisterOperation: () => void;
}

const PendingOpsContext = createContext<PendingOperationsContext | null>(null);

export const usePendingOperations = () => {
  const context = useContext(PendingOpsContext);
  if (!context) {
    throw new Error(
      "usePendingOperations must be used within ForcarAutenticacao",
    );
  }
  return context;
};

export default function ForcarAutenticacao(props: any) {
  const { usuario, carregando } = useSessao();
  const router = useRouter();
  const caminho = usePathname();
  const pendingOperations = useRef(0);

  const registerOperation = () => {
    pendingOperations.current++;
  };

  const unregisterOperation = () => {
    pendingOperations.current--;
  };

  useEffect(() => {
    if (!carregando && !usuario?.email && pendingOperations.current === 0) {
      router.push(`/entrar?destino=${caminho}`);
    }
  }, [carregando, usuario, caminho, router]);

  if (carregando || !usuario?.email) {
    return <Processando />;
  }

  return (
    <PendingOpsContext.Provider
      value={{ registerOperation, unregisterOperation }}
    >
      {props.children}
    </PendingOpsContext.Provider>
  );
}
