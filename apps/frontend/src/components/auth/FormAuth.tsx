"use client";

import Link from "next/link";

import useFormAuth from "@/src/data/hooks/useFormAuth";
import CampoEmail from "../shared/formulario/CampoEmail";
import CampoSenha from "../shared/formulario/CampoSenha";
import CampoTelefone from "../shared/formulario/CampoTelefone";
import CampoTexto from "../shared/formulario/CampoTexto";
import Logo from "../shared/logo/Logo";
import styles from "./FormAuth.module.css";

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
    handleSubmit,
  } = useFormAuth();

  return (
    <div className={styles.formulario__container}>
      <div className="pb-2">
        <Link href={"/"}>
          <Logo />
        </Link>
        {modo === "login" ? (
          <span className={styles.formulario__container_logotipo}>
            Entre com sua conta
          </span>
        ) : (
          <span className={styles.formulario__container_logotipo}>
            Cadastrar
          </span>
        )}
      </div>
      <div className={`${styles.formulario} gap-4`}>
        {modo === "cadastro" && (
          <>
            <CampoTexto
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
              icon={true}
            />
            <CampoTelefone
              placeholder="Telefone"
              value={telefone}
              onChangeText={setTelefone}
            />
          </>
        )}
        <CampoEmail
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <CampoSenha placeholder="Senha" value={senha} onChangeText={setSenha} />
        {modo === "login" && (
          <span className={styles.formulario__link}>
            <Link href="/trocarsenha">Esqueceu sua senha?</Link>
          </span>
        )}
        <div className={`${styles.form__buttoncontainer} mt-4`}>
          <button onClick={handleSubmit} className={styles.form__button_green}>
            Confirmar
          </button>
          <button className={styles.form__button_red}>
            <Link href="/">Cancelar</Link>
          </button>
        </div>
      </div>
      <div className={`${styles.formulario} mt-4`}>
        <button onClick={alternarModo}>
          {modo === "login" ? (
            <div>
              Ainda não possui conta?{" "}
              <span className="text-green-500">Cadastre-se aqui</span>
            </div>
          ) : (
            <span>
              Já tem uma conta?{" "}
              <span className="text-green-500">Faça o Login</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
