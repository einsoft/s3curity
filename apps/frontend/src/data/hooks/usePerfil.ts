"use client";

import { useCallback, useEffect, useState } from "react";

import useAPI from "./useAPI";

export default function usePerfil() {
  const [processando, setProcessando] = useState(false);
  const [perfis, setPerfis] = useState([]);

  const { httpGet } = useAPI();

  const fetchPerfis = useCallback(async () => {
    try {
      setProcessando(true);
      const data = await httpGet("/perfil/listar");
      setPerfis(data);
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
    } finally {
      setProcessando(false);
    }
  }, [httpGet]);

  useEffect(() => {
    fetchPerfis();
  }, []);

  return {
    processando,
    perfis,
    fetchPerfis,
  };
}
