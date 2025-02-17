"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import useSessao from "../hooks/useSessao";
import { useToastContext } from "./ToastContext";

interface AuthContextType {
  modo: "login" | "cadastro";
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  alternarModo: () => void;
  setNome: (value: string) => void;
  setTelefone: (value: string) => void;
  setEmail: (value: string) => void;
  setSenha: (value: string) => void;
  handleSubmit: () => Promise<void>;
  isLoading: boolean;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");

  const router = useRouter();
  const { showSuccess, showError } = useToastContext();
  const { iniciarSessao } = useSessao();

  const alternarModo = () => {
    setModo(modo === "login" ? "cadastro" : "login");
    // Reset form when switching modes
    setNome("");
    setTelefone("");
    setEmail("");
    setSenha("");
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!email || !senha) {
        showError("Campos obrigatórios", "Email e senha são obrigatórios");
        return;
      }

      if (modo === "cadastro" && (!nome || !telefone)) {
        showError("Campos obrigatórios", "Todos os campos são obrigatórios");
        return;
      }

      const endpoint = modo === "login" ? "/auth/login" : "/auth/register";
      const body =
        modo === "login" ? { email, senha } : { nome, telefone, email, senha };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Important: include credentials in requests
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao processar requisição");
      }

      const data = await response.json();

      if (modo === "login") {
        // Use ContextoSessao to store the token
        iniciarSessao(data.token);

        showSuccess("Login realizado!", "Você será redirecionado em breve");

        // Redirect after successful login
        router.push(redirectPath);
      } else {
        showSuccess("Cadastro realizado!", "Você pode fazer login agora");

        // Switch to login mode after successful registration
        setModo("login");
      }

      // Reset form
      setNome("");
      setTelefone("");
      setEmail("");
      setSenha("");
    } catch (error) {
      showError(
        "Erro",
        error instanceof Error ? error.message : "Ocorreu um erro inesperado",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        modo,
        nome,
        telefone,
        email,
        senha,
        alternarModo,
        setNome,
        setTelefone,
        setEmail,
        setSenha,
        handleSubmit,
        isLoading,
        redirectPath,
        setRedirectPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
