"use client";

import Link from "next/link";

import useFormAuth from "@/src/data/hooks/useFormAuth";
import Logo from "../logo/Logo";
import CampoEmail from "../shared/formulario/CampoEmail";
import CampoSenha from "../shared/formulario/CampoSenha";
import CampoTelefone from "../shared/formulario/CampoTelefone";
import CampoTexto from "../shared/formulario/CampoTexto";

export default function FormAuth() {
  const { modo, nome, telefone, email, senha, alternarModo, setNome, setTelefone, setEmail, setSenha, submeter } =
    useFormAuth();

  return (
    <div className="formularioContainer">
      <div className="pb-2">
        <Logo />
        <span className="formularioLogoTipo">Entre com sua conta</span>
      </div>
      <div className="formulario">
        {modo === "cadastro" && (
          <>
            <CampoTexto placeholder="Nome Completo" value={nome} onChangeText={setNome} />
            <CampoTelefone placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
          </>
        )}
        <CampoEmail placeholder="E-mail" value={email} onChangeText={setEmail} />
        <CampoSenha placeholder="Senha" value={senha} onChangeText={setSenha} />
        {modo === "login" && <span className="formularioLink">Esqueceu sua senha?</span>}
        <div className="button_container mt-4">
          <button onClick={submeter} className="button_green">
            Confirmar
          </button>
          <button className="button_red">
            <Link href="/">Cancelar</Link>
          </button>
        </div>
      </div>
      <div className="formulario mt-4">
        <button onClick={alternarModo}>
          {modo === "login" ? (
            <span>Ainda não tem conta? Cadastre-se</span>
          ) : (
            <span>Já tem uma conta? Faça o Login</span>
          )}
        </button>
      </div>
    </div>
  );
}
