"use client";

import usePerfil from "@/src/data/hooks/usePerfil";

export const useFetchPerfis = () => {
  const { perfis } = usePerfil();

  return perfis;
};
