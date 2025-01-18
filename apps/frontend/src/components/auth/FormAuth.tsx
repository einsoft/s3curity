"use client";
import { useState } from "react";
import useAPI from "@/src/data/hooks/useAPI";
import Logo from "../logo/Logo";

export default function FormAuth() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataCriacao] = useState(new Date());
  const [token] = useState("");
  const [imagemPerfil] = useState("https://www.google.com.br/logo.svg");
  const [dataExpiracaoToken] = useState<Date>(
    new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
  );

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
    <div className="formularioContainer">
      <div className="formularioLogo">
        <Logo />
      </div>
      <div className="formulario">
        {modo === "cadastro" && (
          <>
            <div className="espacamento_superior">
              <label className="labelFormLogin" htmlFor="nome">
                Nome Completo
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome Completo"
                className="inputFormLogin"
              />
            </div>
            <div className="espacamento_superior">
              <label className="labelFormLogin" htmlFor="telefone">
                Telefone
              </label>
              <input
                id="nome"
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Telefone"
                className="inputFormLogin"
              />
            </div>
          </>
        )}
        <div className="espacamento_superior">
          <label className="labelFormLogin" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="inputFormLogin"
          />
        </div>
        <div className="espacamento_superior">
          <label
            className="labelFormLogin espacamento_superior"
            htmlFor="senha"
          >
            Senha
          </label>
          <div className="inputFormLogin">
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              className="inputFormLoginPassword"
            />
          </div>
        </div>
        <button
          onClick={submeter}
          className="button_green espacamento_superior"
        >
          Confirmar
        </button>
      </div>
      <div className="formulario espacamento_superior">
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
