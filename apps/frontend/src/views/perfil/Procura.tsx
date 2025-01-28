"use client";

import { useEffect, useMemo, useState } from "react";
import { Perfil } from "@s3curity/core";

import { Input } from "@/src/components/ui/input";
import usePerfil from "@/src/data/hooks/usePerfil";

interface ProcuraProps {
  onSearch: (filteredPerfis: Perfil[]) => void;
}

export default function Procura({ onSearch }: ProcuraProps) {
  const [search, setSearch] = useState("");
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const { fetchPerfis } = usePerfil();

  useEffect(() => {
    async function loadPerfis() {
      const fetchedPerfis = await fetchPerfis();
      setPerfis(fetchedPerfis);
    }

    loadPerfis();
  }, [fetchPerfis]);

  const filteredPerfis = useMemo(() => {
    return perfis.filter((perfil: Perfil) =>
      perfil.nome.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, perfis]);

  useEffect(() => {
    onSearch(filteredPerfis);
  }, [filteredPerfis, onSearch]);

  return (
    <div className="perfil__search-bar">
      <Input
        placeholder="Pesquisar Perfis"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="perfil__search-bar-input"
      />
    </div>
  );
}
