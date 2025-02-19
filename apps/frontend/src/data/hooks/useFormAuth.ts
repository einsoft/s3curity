"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useToastContext } from "../contexts/ToastContext";
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
  data?: any;
  error?: ErrorResponse;
}

export default function useFormAuth() {
  const { showSuccess, showError } = useToastContext();
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
      const authResponse = await httpPost("/auth/login", { email, senha });
      iniciarSessao(authResponse.token, authResponse.refreshToken);
      return { success: true };
    } catch (error: any) {
      const response = error?.response;
      const errorMessage =
        response?.data?.message ||
        response?.data?.error?.message ||
        "Usuário ou senha incorreta";

      showError("Erro de autenticação", errorMessage);

      return {
        success: false,
        error: {
          code: response?.status || 500,
          category: "authentication",
          type: response?.data?.error?.type || "unknown_error",
          message: errorMessage,
          timestamp: new Date().toISOString(),
          path: "/auth/login",
          stack: error?.stack || "",
          details: {
            method: "POST",
            headers: response?.config?.headers || {},
            body: { email, senha },
          },
        },
      };
    }
  }

  async function registrar(): Promise<SubmitResult> {
    try {
      const authResponse = await httpPost("/auth/registrar", {
        nomeCompleto: nome,
        email,
        senha,
        dataCriacao: dataCriacao.toISOString(),
        token,
        dataExpiracaoToken: dataExpiracaoToken.toISOString(),
        telefone,
        imagemPerfil,
      });
      iniciarSessao(authResponse.token, authResponse.refreshToken);
      return { success: true };
    } catch (error: any) {
      const response = error?.response;
      const errorMessage =
        response?.data?.error?.message ||
        response?.data?.message ||
        "Erro ao registrar usuário";

      showError(
        response?.status === 409 ? "Email já cadastrado" : "Erro de registro",
        errorMessage,
      );

      return {
        success: false,
        error: {
          code: response?.status || 500,
          category: "registration",
          type: response?.data?.error?.type || "unknown_error",
          message: errorMessage,
          timestamp: new Date().toISOString(),
          path: "/auth/registrar",
          stack: error?.stack || "",
          details: {
            method: "POST",
            headers: response?.config?.headers || {},
            body: {
              nomeCompleto: nome,
              email,
              senha,
              dataCriacao: dataCriacao.toISOString(),
              token,
              dataExpiracaoToken: dataExpiracaoToken.toISOString(),
              telefone,
              imagemPerfil,
            },
          },
        },
      };
    }
  }

  async function submeter(): Promise<SubmitResult> {
    try {
      return modo === "login" ? await login() : await registrar();
    } catch (error: any) {
      const response = error?.response;
      return {
        success: false,
        error: {
          code: response?.status || 500,
          category: "authentication",
          type: response?.data?.error?.type || "unknown_error",
          message:
            response?.data?.message ||
            response?.data?.error?.message ||
            "Usuário ou senha incorreta",
          timestamp: new Date().toISOString(),
          path: "/auth",
          stack: error?.stack || "",
          details: {
            method: "POST",
            headers: response?.config?.headers || {},
            body:
              modo === "login"
                ? { email, senha }
                : { nome, email, senha, telefone },
          },
        },
      };
    }
  }

  const handleRegistrationSuccess = async () => {
    const loginResult = await submeter();
    if (loginResult.success) {
      showSuccess(
        "Cadastro realizado!",
        "Você foi automaticamente logado e será redirecionado.",
      );
    } else {
      showSuccess(
        "Cadastro realizado!",
        "Por favor, faça login com suas novas credenciais.",
      );
      alternarModo();
    }
  };

  const handleLoginSuccess = () => {
    showSuccess("Login realizado!", "Você será redirecionado em breve.");
  };

  const handleSuccess = () => {
    if (modo === "cadastro") {
      handleRegistrationSuccess();
    } else {
      handleLoginSuccess();
    }
  };

  const handleError = (error: any) => {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";

    if (errorMessage.includes("Já existe um usuário com este email")) {
      showError(
        "Email já cadastrado",
        "Este email já está em uso. Tente fazer login.",
      );
    } else if (
      errorMessage.includes("Dados de registro inválidos") ||
      errorMessage.includes("Dados inválidos")
    ) {
      showError(
        "Dados inválidos",
        "Verifique os dados informados e tente novamente.",
      );
    } else if (
      errorMessage.includes("Usuário ou senha incorretos") ||
      errorMessage.includes("Credenciais inválidas")
    ) {
      showError(
        "Credenciais inválidas",
        "E-mail ou senha incorretos. Verifique suas credenciais.",
      );
    } else {
      showError("Erro na autenticação", errorMessage);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const result = await submeter();

      if (result.success) {
        handleSuccess();
      }
    } catch (error) {
      handleError(error);
    }
  };

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
    handleRegistrationSuccess,
    handleLoginSuccess,
    handleSuccess,
    handleError,
    handleSubmit,
  };
}
