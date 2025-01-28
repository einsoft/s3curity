"use client";

import { useState } from "react";

import useAPI from "./useAPI";

export default function usePerfil() {
  const [processando, setProcessando] = useState(false);

  const { httpGet } = useAPI();

  async function fetchPerfis() {
    try {
      setProcessando(true);
      const perfis = await httpGet("/perfil/listar");
      console.log(perfis);
      return perfis;
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
      return null;
    } finally {
      setProcessando(false);
    }
  }

  return {
    processando,
    fetchPerfis,
  };
}
