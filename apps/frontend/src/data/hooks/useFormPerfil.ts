"use client";

import { useEffect, useState } from "react";

import useAPI from "./useAPI";
import useSessao from "./useSessao";

export default function useFormPerfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [processando, setProcessando] = useState(false);

  const { usuario, atualizarSessao } = useSessao();
  const { httpPatch } = useAPI();

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

  async function submeter() {
    if (!usuario?.id) return;
    try {
      setProcessando(true);
      const novoToken = await httpPatch(`/usuario/${usuario.id}/alterarNome`, {
        nomeCompleto: nome,
      });
      if (novoToken) {
        await atualizarSessao(novoToken);
        // Update local state to match new session state
        setNome(nome);
      }
    } catch (error) {
      console.error("Erro ao atualizar nome:", error);
    } finally {
      setProcessando(false);
    }
  }

  return {
    nome,
    email,
    processando,
    limparFormulario,
    setNome,
    setEmail,
    submeter,
  };
}
