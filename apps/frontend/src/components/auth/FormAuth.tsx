"use client";
import Logo from "../logo/Logo";
import useFormAuth from "@/src/data/hooks/useFormAuth";
import CampoSenha from "../shared/formulario/CampoSenha";
import CampoTexto from "../shared/formulario/CampoTexto";
import CampoTelefone from "../shared/formulario/CampoTelefone";
import CampoEmail from "../shared/formulario/CampoEmail";

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

  return (
    <div className="formularioContainer">
      <div className="formularioLogo">
        <Logo />
      </div>
      <div className="formulario">
        {modo === "cadastro" && (
          <>
            <CampoTexto
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
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
