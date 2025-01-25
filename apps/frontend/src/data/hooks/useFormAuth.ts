"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useAPI from "./useAPI";
import useSessao from "./useSessao";

interface ErrorResponse {
  code: number;
  category: string;
  type: string;
  message: string;
  timestamp: string;
  path: string;
  stack: string;
  details: {
    method: string;
    headers: Record<string, string>;
    body: Record<string, string>;
  };
}

interface SubmitResult {
  success: boolean;
  error?: ErrorResponse;
}

export default function useFormAuth() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataCriacao] = useState(new Date());
  const [token] = useState("");
  const [imagemPerfil] = useState("avatar.svg");
  const [dataExpiracaoToken] = useState<Date>(
    new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
  );

  const { httpPost } = useAPI();
  const { usuario, iniciarSessao } = useSessao();
  const router = useRouter();
  const param = useSearchParams();

  useEffect(() => {
    if (usuario?.email) {
      const destino = param.get("destino") as string;
      router.push(destino ? destino : "/");
    }
  }, [usuario, router, param]);

  function limparFormulario() {
    setNome("");
    setTelefone("");
    setEmail("");
    setSenha("");
    setModo("login");
  }

  function alternarModo() {
    setModo(modo === "login" ? "cadastro" : "login");
  }

  async function login(): Promise<SubmitResult> {
    try {
      const token = await httpPost("/auth/login", { email, senha });
      iniciarSessao(token);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error?.response?.status || 500,
          category: "authentication",
          type: error?.response?.data?.error?.type || "unknown_error",
          message:
            error?.response?.data?.error?.message ||
            "Usuário ou senha incorreta",
          timestamp: new Date().toISOString(),
          path: "/auth/login",
          stack: error?.stack || "",
          details: {
            method: "POST",
            headers: {},
            body: { email, senha },
          },
        },
      };
    }
  }

  async function registrar() {
    await httpPost("/auth/registrar", {
      nomeCompleto: nome,
      email,
      senha,
      dataCriacao,
      token,
      dataExpiracaoToken,
      telefone,
      imagemPerfil,
    });
  }

  async function submeter(): Promise<SubmitResult> {
    try {
      if (modo === "login") {
        return await login();
      } else {
        await registrar();
        return await login();
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: error?.response?.status || 500,
          category: "authentication",
          type: error?.response?.data?.error?.type || "unknown_error",
          message:
            error?.response?.data?.error?.message ||
            "Usuário ou senha incorreta",
          timestamp: new Date().toISOString(),
          path: "/auth",
          stack: error?.stack || "",
          details: {
            method: "POST",
            headers: {},
            body:
              modo === "login"
                ? { email, senha }
                : { nome, email, senha, telefone },
          },
        },
      };
    } finally {
      limparFormulario();
    }
  }

  return {
    modo,
    nome,
    telefone,
    email,
    senha,
    dataCriacao,
    token,
    imagemPerfil,
    dataExpiracaoToken,
    alternarModo,
    submeter,
    limparFormulario,
    setNome,
    setTelefone,
    setEmail,
    setSenha,
  };
}
