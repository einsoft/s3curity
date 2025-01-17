"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../assets/images/logo.svg";

export default function FormAuth() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");

  function alternarModo() {
    setModo(modo === "login" ? "cadastro" : "login");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={logo} width={150} height={150} alt="Logo" />
      <div className="flex flex-col">
        {modo === "cadastro" && (
          <>
            <input type="text" placeholder="Nome Completo" />
            <input type="text" placeholder="Telefone" />
          </>
        )}
        <input type="text" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button>Confirmar</button>
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
