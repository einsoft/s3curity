import { useState } from "react";
import { useRouter } from "next/navigation";

import useAPI from "./useAPI";
import useSessao from "./useSessao";

export default function useFormAuth() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataCriacao] = useState(new Date());
  const [token] = useState("");
  const [imagemPerfil] = useState("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_150x54dp.png");
  const [dataExpiracaoToken] = useState<Date>(new Date(new Date().getTime() + 1000 * 60 * 60 * 24));

  const { httpPost } = useAPI();
  const { iniciarSessao } = useSessao();
  const router = useRouter();

  function limparFormulario() {
    setNome("");
    setTelefone("");
    setEmail("");
    setSenha("");
    setModo("login");
  }

  function alternarModo() {
    setModo(modo === "login" ? "cadastro" : "login");
  }

  async function login() {
    const token = await httpPost("/auth/login", { email, senha });
    iniciarSessao(token);
    router.push("/");
  }

  async function registrar() {
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
  }

  async function submeter() {
    if (modo === "login") {
      await login();
    } else {
      await registrar();
      await login();
    }
    limparFormulario();
  }

  return {
    modo,
    nome,
    telefone,
    email,
    senha,
    dataCriacao,
    token,
    imagemPerfil,
    dataExpiracaoToken,
    alternarModo,
    submeter,
    limparFormulario,
    setNome,
    setTelefone,
    setEmail,
    setSenha,
  };
}
