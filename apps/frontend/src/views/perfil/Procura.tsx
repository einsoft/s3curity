"use client";

import { useEffect, useMemo, useState } from "react";
import { Perfil } from "@s3curity/core";

import { Input } from "@/src/components/ui/input";
import { perfis } from "./dataMocked";

interface ProcuraProps {
  onSearch: (filteredPerfis: Perfil[]) => void;
}

export default function Procura({ onSearch }: ProcuraProps) {
  const [search, setSearch] = useState("");

  const filteredPerfis = useMemo(() => {
    return perfis.filter((perfil: Perfil) =>
      perfil.nome.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

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
