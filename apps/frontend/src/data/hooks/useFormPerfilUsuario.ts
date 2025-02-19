"use client";

import { useEffect, useRef, useState } from "react";

import { usePendingOperations } from "@/src/components/shared/ForcarAutenticacao";
import useAPI from "./useAPI";
import useSessao from "./useSessao";

export default function useFormPerfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [processando, setProcessando] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaNovaSenha, setConfirmaNovaSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const mounted = useRef(true);
  const { registerOperation, unregisterOperation } = usePendingOperations();

  const { usuario, atualizarSessao } = useSessao();
  const { httpPatch } = useAPI();

  useEffect(() => {
    if (usuario?.nomeCompleto) {
      setNome(usuario?.nomeCompleto);
      setEmail(usuario?.email);
    }
    return () => {
      mounted.current = false;
    };
  }, [usuario]);

  function limparFormulario() {
    setNome("");
    setEmail("");
  }

  async function submeter(): Promise<boolean> {
    if (!usuario?.id) return false;
    try {
      registerOperation();
      setProcessando(true);
      const response = await httpPatch(`/usuario/${usuario.id}/alterarNome`, {
        nomeCompleto: nome,
      });

      if (!mounted.current) return false;

      if (response?.success && response.token && response.refreshToken) {
        atualizarSessao(response.token, response.refreshToken);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro ao atualizar nome:", error);
      return false;
    } finally {
      unregisterOperation();
      if (mounted.current) {
        setProcessando(false);
      }
    }
  }

  async function submeterSenha() {
    if (!usuario?.id) return;

    const trimmedNovaSenha = novaSenha.trim();
    const trimmedConfirmaSenha = confirmaNovaSenha.trim();

    if (!trimmedNovaSenha || !trimmedConfirmaSenha) {
      alert("Por favor, preencha ambos os campos de senha");
      return;
    }

    if (trimmedNovaSenha !== trimmedConfirmaSenha) {
      alert("As senhas não coincidem. Verifique se digitou corretamente.");
      return;
    }

    if (trimmedNovaSenha.length < 8) {
      alert("A nova senha deve ter pelo menos 8 caracteres");
      return;
    }

    try {
      registerOperation();
      setErroSenha("");
      setProcessando(true);
      const result = await httpPatch(`/usuario/${usuario.id}/alterarSenha`, {
        senhaAtual,
        novaSenha,
        confirmaNovaSenha,
      });

      if (!mounted.current) return;

      if (result?.success && result?.token && result?.refreshToken) {
        atualizarSessao(result.token, result.refreshToken);
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmaNovaSenha("");
        return true;
      } else if (result?.error) {
        setErroSenha(result.error.message);
        return false;
      }
    } catch (error: any) {
      if (!mounted.current) return;

      if (error.response?.data?.error) {
        const { message, details } = error.response.data.error;
        setErroSenha(message);
        console.error("Erro ao alterar senha:", {
          code: error.response.data.error.code,
          message,
          details,
        });
      } else {
        setErroSenha("Ocorreu um erro ao alterar a senha. Tente novamente.");
        console.error("Erro desconhecido ao alterar senha:", error);
      }
    } finally {
      unregisterOperation();
      if (mounted.current) {
        setProcessando(false);
      }
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
    senhaAtual,
    setSenhaAtual,
    novaSenha,
    setNovaSenha,
    confirmaNovaSenha,
    setConfirmaNovaSenha,
    submeterSenha,
    erroSenha,
  };
}
