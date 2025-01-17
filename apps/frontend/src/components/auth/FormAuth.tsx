"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/images/logo.svg";
import useAPI from "@/src/data/hooks/useAPI";

export default function FormAuth() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataCriacao] = useState(new Date());
  const [token] = useState("");
  const [dataExpiracaoToken] = useState<Date>(
    new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
  );
  const [imagemPerfil] = useState("https://www.google.com.br/logo.svg");

  const { httpPost } = useAPI();

  function alternarModo() {
    setModo(modo === "login" ? "cadastro" : "login");
  }

  async function submeter() {
    if (modo === "login") {
      const token = await httpPost("/auth/login", { email, senha });
      console.log(token);
      limparFormulario();
    } else {
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
      limparFormulario();
    }
  }

  function limparFormulario() {
    setNome("");
    setTelefone("");
    setEmail("");
    setSenha("");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={logo} width={150} height={150} alt="Logo" priority={false} />
      <div className="flex flex-col">
        {modo === "cadastro" && (
          <>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome Completo"
            />
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Telefone"
            />
          </>
        )}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
        />
        <button onClick={submeter}>Confirmar</button>
      </div>
      <div>
        <button onClick={alternarModo}>
          {modo === "login" ? (
            <span>Aindão não tem conta? Cadastre-se</span>
          ) : (
            <span>Já tem uma conta? Faça o Login</span>
          )}
        </button>
      </div>
    </div>
  );
}
