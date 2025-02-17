"use client";

import { useCallback, useEffect, useState } from "react";

import { useToastContext } from "../contexts/ToastContext";
import useAPI from "./useAPI";

export default function usePerfil() {
  const [processando, setProcessando] = useState(false);
  const [perfis, setPerfis] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  const { httpGet, httpPost } = useAPI();
  const { showSuccess, showError } = useToastContext();

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

  const createPerfil = async () => {
    if (nome.length < 3) {
      showError("Nome inválido", "O nome deve ter no mínimo 3 caracteres");
      return;
    }

    try {
      setProcessando(true);
      await httpPost("/perfil/cadastrarperfil", {
        nome,
        descricao: descricao || undefined,
        status: status || "ativo",
      });

      showSuccess("Perfil criado", "Perfil cadastrado com sucesso!");
      setNome("");
      setDescricao("");
      setStatus("");
      await fetchPerfis();
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
      showError(
        "Erro ao criar perfil",
        "Ocorreu um erro ao tentar criar o perfil. Tente novamente.",
      );
    } finally {
      setProcessando(false);
    }
  };

  return {
    nome,
    setNome,
    descricao,
    setDescricao,
    status,
    setStatus,
    processando,
    perfis,
    fetchPerfis,
    createPerfil,
  };
}
