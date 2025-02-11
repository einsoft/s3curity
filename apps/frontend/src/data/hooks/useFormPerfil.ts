"use client";

import { useEffect, useState } from "react";

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
        atualizarSessao(novoToken);
        setNome(nome);
      }
    } catch (error) {
      console.error("Erro ao atualizar nome:", error);
    } finally {
      setProcessando(false);
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
      setErroSenha("");
      setProcessando(true);
      const response = await httpPatch(`/usuario/${usuario.id}/alterarSenha`, {
        senhaAtual,
        novaSenha,
        confirmaNovaSenha,
      });

      if (response?.success) {
        atualizarSessao(response.token);
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmaNovaSenha("");
      } else if (response?.error) {
        setErroSenha(response.error.message);
      }
    } catch (error: any) {
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
