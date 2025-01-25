"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useToast } from "@/src/data/hooks/use-toast";
import useFormAuth from "@/src/data/hooks/useFormAuth";
import Logo from "../logo/Logo";
import CampoEmail from "../shared/formulario/CampoEmail";
import CampoSenha from "../shared/formulario/CampoSenha";
import CampoTelefone from "../shared/formulario/CampoTelefone";
import CampoTexto from "../shared/formulario/CampoTexto";

export default function FormAuth() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
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
  const toastest = searchParams.get("toastest");

  const handleSubmit = async (): Promise<void> => {
    try {
      await submeter();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      if (
        errorMessage.toLowerCase().includes("usuário ou senha incorretos") ||
        errorMessage.toLowerCase().includes("credenciais inválidas")
      ) {
        toast({
          title: "Credenciais inválidas",
          description:
            "E-mail ou senha incorretos. Verifique suas credenciais.",
          variant: "destructive",
        });
      } else if (
        errorMessage.toLowerCase().includes("senha") ||
        errorMessage.toLowerCase().includes("incorreta")
      ) {
        toast({
          title: "Credenciais inválidas",
          description:
            "E-mail ou senha incorretos. Verifique suas credenciais.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro na autenticação",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="formulario__container">
      <div className="pb-2">
        <Link href={"/"}>
          <Logo />
        </Link>
        {modo === "login" ? (
          <span className="formulario__container--logotipo">
            Entre com sua conta
          </span>
        ) : (
          <span className="formulario__container--logotipo">Cadastrar</span>
        )}
      </div>
      <div className="formulario gap-4">
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
        {modo === "login" && (
          <span className="formulario__link">
            <Link href="/trocarsenha">Esqueceu sua senha?</Link>
          </span>
        )}
        <div className="form__buttoncontainer mt-4">
          <button onClick={handleSubmit} className="form__button--green">
            Confirmar
          </button>
          <button className="form__button--red">
            <Link href="/">Cancelar</Link>
          </button>
        </div>
        {toastest && (
          <div className="form__buttoncontainer mt-4">
            <button
              onClick={() =>
                toast({
                  title: "Test Toast",
                  description: "This is a test toast message",
                })
              }
              className="form__button--blue"
            >
              Test Toast
            </button>
          </div>
        )}
      </div>
      <div className="formulario mt-4">
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
