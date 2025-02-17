"use client";

import { useEffect } from "react";
import Link from "next/link";

import { useAuthContext } from "@/src/data/contexts/AuthContext";
import { cn } from "@/src/lib/utils";
import CampoEmail from "../shared/formulario/CampoEmail";
import CampoSenha from "../shared/formulario/CampoSenha";
import CampoTelefone from "../shared/formulario/CampoTelefone";
import CampoTexto from "../shared/formulario/CampoTexto";
import Logo from "../shared/logo/Logo";

interface FormAuthProps {
  className?: string;
  redirectPath?: string;
}

export default function FormAuth({
  className,
  redirectPath = "/",
}: FormAuthProps) {
  const {
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
    setRedirectPath,
  } = useAuthContext();

  useEffect(() => {
    setRedirectPath(redirectPath);
  }, [redirectPath, setRedirectPath]);

  return (
    <div
      className={cn(
        "flex flex-col items-center w-full max-w-md mx-auto p-6 space-y-6 bg-[#18181b] rounded-lg",
        className,
      )}
    >
      <div className="flex flex-col items-center space-y-2 w-full">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <h1 className="text-2xl font-semibold text-white">
          {modo === "login" ? "Entre com sua conta" : "Cadastrar"}
        </h1>
      </div>
      <div className="flex flex-col w-full space-y-4">
        {modo === "cadastro" && (
          <>
            <CampoTexto
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
              icon={true}
              required
              aria-label="Nome Completo"
            />
            <CampoTelefone
              placeholder="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              required
              aria-label="Telefone"
            />
          </>
        )}
        <CampoEmail
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          required
          aria-label="E-mail"
        />
        <CampoSenha
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          required
          aria-label="Senha"
        />
        {modo === "login" && (
          <Link
            href="/trocarsenha"
            className="text-sm text-green-600 hover:text-green-500 self-end"
          >
            Esqueceu sua senha?
          </Link>
        )}
        <div className="flex flex-col space-y-4 mt-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Processando..." : "Confirmar"}
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-center transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </div>
      <button
        onClick={alternarModo}
        className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md transition-colors"
      >
        {modo === "login" ? (
          <span>
            Ainda não possui conta?{" "}
            <span className="text-green-600">Cadastre-se aqui</span>
          </span>
        ) : (
          <span>
            Já tem uma conta?{" "}
            <span className="text-green-600">Faça o Login</span>
          </span>
        )}
      </button>
    </div>
  );
}
