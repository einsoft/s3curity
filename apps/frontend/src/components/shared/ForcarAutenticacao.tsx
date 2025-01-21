"use client";

import { usePathname, useRouter } from "next/navigation";

import useSessao from "@/src/data/hooks/useSessao";
import Processando from "./Processando";

export default function ForcarAutenticacao(props: any) {
  const { usuario, carregando } = useSessao();
  const router = useRouter();
  const caminho = usePathname();

  if (!usuario?.email) {
    router.push(`/entrar?destino=${caminho}`);
    return <Processando />;
  }

  if (carregando && !usuario?.email) return <Processando />;

  return props.children;
}
