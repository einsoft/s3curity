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
    <div className="formulario__container">
      <div className="pb-2">
        <Logo />
        <span className="formulario__container--logotipo">Entre com sua conta</span>
      </div>
      <div className="formulario gap-4">
        {modo === "cadastro" && (
          <>
            <CampoTexto placeholder="Nome Completo" value={nome} onChangeText={setNome} />
            <CampoTelefone placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
          </>
        )}
        <CampoEmail placeholder="E-mail" value={email} onChangeText={setEmail} />
        <CampoSenha placeholder="Senha" value={senha} onChangeText={setSenha} />
        {modo === "login" && <span className="formulario__link">Esqueceu sua senha?</span>}
        <div className="form__buttoncontainer mt-4">
          <button onClick={submeter} className="form__button--green">
            Confirmar
          </button>
          <button className="form__button--red">
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
