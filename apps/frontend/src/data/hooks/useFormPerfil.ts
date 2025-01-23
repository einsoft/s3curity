"use client";

import { useEffect, useState } from "react";

import useSessao from "./useSessao";

export default function useFormPerfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const { usuario } = useSessao();

  useEffect(() => {
    if (usuario?.nomeCompleto) {
      setNome(usuario?.nomeCompleto);
      setEmail(usuario?.email);
    }
  }, [usuario]);

  function limparFormulario() {
    setNome("");
    setEmail("");
  }

  return {
    nome,
    email,
    limparFormulario,
    setNome,
    setEmail,
  };
}
