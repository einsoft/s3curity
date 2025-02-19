import "./perfil-usuario.css";

import { useState } from "react";
import Image from "next/image";

import Cabecalho from "@/src/components/shared/Cabecalho";
import CampoEmail from "@/src/components/shared/formulario/CampoEmail";
import CampoSenha from "@/src/components/shared/formulario/CampoSenha";
import CampoTexto from "@/src/components/shared/formulario/CampoTexto";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import useFormPerfilUsuario from "@/src/data/hooks/useFormPerfilUsuario";
import useSessao from "@/src/data/hooks/useSessao";

export default function PerfilUsuario() {
  const { usuario } = useSessao();
  const {
    nome,
    setNome,
    submeter,
    loadingName,
    loadingPassword,
    email,
    senhaAtual,
    setSenhaAtual,
    novaSenha,
    setNovaSenha,
    confirmaNovaSenha,
    setConfirmaNovaSenha,
    submeterSenha,
    erroSenha,
  } = useFormPerfilUsuario();

  const [messages, setMessages] = useState({
    nameSuccess: "",
    passwordSuccess: "",
  });
  const [showMessages, setShowMessages] = useState({
    name: false,
    password: false,
  });

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submeter();
    if (success) {
      setMessages({ ...messages, nameSuccess: "Nome alterado com sucesso!" });
      setShowMessages({ ...showMessages, name: true });
      setTimeout(() => {
        setMessages({ ...messages, nameSuccess: "" });
        setShowMessages({ ...showMessages, name: false });
      }, 3000);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submeterSenha();
    if (result !== false) {
      setMessages({
        ...messages,
        passwordSuccess: "Senha alterada com sucesso!",
      });
      setShowMessages({ ...showMessages, password: true });
      setTimeout(() => {
        setMessages({ ...messages, passwordSuccess: "" });
        setShowMessages({ ...showMessages, password: false });
      }, 3000);
    }
  };

  return (
    <div className="perfilUsuario__container perfilUsuario__margin-top-16">
      <Cabecalho />
      <div className="perfilUsuario__formulario-container">
        <header>
          <div className="perfilUsuario__flex perfilUsuario__items-center perfilUsuario__space-x-3">
            <Image
              src={usuario?.imagemPerfil || "/avatar.svg"}
              alt="Avatar"
              width={96}
              height={96}
              className="perfilUsuario__rounded-full perfilUsuario__margin-bottom-4 perfilUsuario__aspect-square perfilUsuario__object-cover"
            />
            <div className="perfilUsuario__space-y-1">
              <h1 className="perfilUsuario__text-2xl perfilUsuario__font-bold">
                {usuario?.nomeCompleto}
              </h1>
              <Button aria-label="Alterar avatar">Mudar avatar</Button>
            </div>
          </div>
        </header>
        <div className="space-y-8 w-full">
          <Card className="perfilUsuario__bg-gray-100 perfilUsuario__border-dashed perfilUsuario__border-2 perfilUsuario__border-gray-100">
            <div className="perfilUsuario__formulario-container-logotipo perfilUsuario__text-zinc-500">
              Informações principais
            </div>
            <CardContent className="perfilUsuario__space-y-6">
              <div className="perfilUsuario__space-y-2 perfilUsuario__padding-top-4">
                <CampoTexto
                  value={nome || ""}
                  placeholder="Nome completo"
                  onChangeText={setNome}
                />
              </div>
              <div className="perfilUsuario__space-y-2">
                <CampoEmail
                  placeholder="E-mail principal"
                  value={email}
                  disabled={true}
                  onChangeText={() => {}}
                />
              </div>
              <div className="perfilUsuario__padding-top-6 perfilUsuario__flex perfilUsuario__justify-center perfilUsuario__bg perfilUsuario__w-full perfilUsuario__relative">
                <button
                  className="perfilUsuario__form-button-green perfilUsuario__w-full"
                  disabled={loadingName}
                  onClick={(e: React.FormEvent) => handleNameSubmit(e)}
                >
                  {loadingName ? "Salvando..." : "Alterar nome"}
                </button>
                {showMessages.name && (
                  <div className="perfilUsuario__absolute perfilUsuario__bottom-full perfilUsuario__mb-2 perfilUsuario__bg-green-500 perfilUsuario__text-white perfilUsuario__rounded perfilUsuario__px-4 perfilUsuario__py-2">
                    {messages.nameSuccess}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card
            id="aviso"
            className="perfilUsuario__bg-gray-100 perfilUsuario__border-dashed perfilUsuario__border-2 perfilUsuario__border-gray-100"
          >
            <div className="perfilUsuario__formulario-container-logotipo perfilUsuario__text-zinc-500">
              Mudar a senha
            </div>
            <CardHeader className="perfilUsuario__formulario-container-aviso">
              <div className={erroSenha ? "perfilUsuario__text-red-500" : ""}>
                {erroSenha ||
                  "Para sua segurança, não compartilhe sua senha com outras pessoas."}
              </div>
            </CardHeader>
            <CardContent className="perfilUsuario__space-y-4">
              <div className="perfilUsuario__space-y-2">
                <CampoSenha
                  id="senha"
                  placeholder="Senha atual"
                  value={senhaAtual}
                  onChangeText={setSenhaAtual}
                />
                <CampoSenha
                  id="novasenha"
                  placeholder="Nova senha"
                  value={novaSenha}
                  onChangeText={setNovaSenha}
                />
                <CampoSenha
                  id="confirmenovasenha"
                  placeholder="Confirme a nova senha"
                  value={confirmaNovaSenha}
                  onChangeText={setConfirmaNovaSenha}
                />
              </div>
              <div className="perfilUsuario__flex perfilUsuario__flex-col perfilUsuario__space-y-4 perfilUsuario__padding-top-6 perfilUsuario__w-full">
                <div className="perfilUsuario__relative w-full">
                  <button
                    className="perfilUsuario__form-button-green perfilUsuario__w-full"
                    disabled={loadingPassword}
                    onClick={(e: React.FormEvent) => handlePasswordSubmit(e)}
                  >
                    {loadingPassword ? "Salvando..." : "Alterar senha"}
                  </button>
                  {showMessages.password && (
                    <div className="perfilUsuario__absolute perfilUsuario__bottom-full perfilUsuario__mb-2 perfilUsuario__bg-green-500 perfilUsuario__text-white perfilUsuario__rounded perfilUsuario__px-4 perfilUsuario__py-2">
                      {messages.passwordSuccess}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
