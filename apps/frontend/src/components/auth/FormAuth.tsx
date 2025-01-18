"use client";
import { useState } from "react";
import Logo from "../logo/Logo";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import useFormAuth from "@/src/data/hooks/useFormAuth";

export default function FormAuth() {
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
    submeter,
  } = useFormAuth();

  const [mostrarSenha, setMostrarSenha] = useState(false);

  function alternarMostrarSenha() {
    setMostrarSenha(!mostrarSenha);
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
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              className="inputFormLoginPassword"
            />
            <div>
              {mostrarSenha ? (
                <IconEyeOff
                  onClick={alternarMostrarSenha}
                  className="inputFormLoginPasswordEyeIcon"
                />
              ) : (
                <IconEye
                  onClick={alternarMostrarSenha}
                  className="inputFormLoginPasswordEyeIcon"
                />
              )}
            </div>
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
