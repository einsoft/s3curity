import Image from "next/image";

import Cabecalho from "@/src/components/shared/Cabecalho";
import CampoEmail from "@/src/components/shared/formulario/CampoEmail";
import CampoSenha from "@/src/components/shared/formulario/CampoSenha";
import CampoTexto from "@/src/components/shared/formulario/CampoTexto";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import useFormPerfil from "@/src/data/hooks/useFormPerfilUsuario";
import useSessao from "@/src/data/hooks/useSessao";

export default function PerfilUsuario() {
  const { usuario } = useSessao();
  const {
    nome,
    setNome,
    submeter,
    processando,
    email,
    senhaAtual,
    setSenhaAtual,
    novaSenha,
    setNovaSenha,
    confirmaNovaSenha,
    setConfirmaNovaSenha,
    submeterSenha,
    erroSenha,
  } = useFormPerfil();

  return (
    <div className="perfilUsuario__container perfilUsuario__margin-top-16">
      <Cabecalho />
      <div className="perfilUsuario__formulario-container">
        <header>
          <div className="perfilUsuario__flex perfilUsuario__items-center perfilUsuario__space-x-3">
            <Image
              src={
                usuario?.imagemPerfil ? usuario?.imagemPerfil : "/avatar.svg"
              }
              alt="Avatar"
              width="96"
              height="96"
              className="perfilUsuario__rounded-full perfilUsuario__margin-bottom-4"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
              priority={false}
            />
            <div className="perfilUsuario__space-y-1">
              <h1 className="perfilUsuario__text-2xl perfilUsuario__font-bold">
                {usuario?.nomeCompleto}
              </h1>
              <Button>Mudar avatar</Button>
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
                  labelText="Nome completo"
                />
              </div>
              <div className="perfilUsuario__space-y-2">
                <CampoEmail
                  placeholder="E-mail principal"
                  value={email}
                  labelText="E-mail"
                  disabled={true}
                />
              </div>
              <div className="perfilUsuario__padding-top-6 perfilUsuario__flex perfilUsuario__justify-center perfilUsuario__bg perfilUsuario__w-full">
                <button
                  className="perfilUsuario__form-button-green perfilUsuario__w-full"
                  disabled={processando}
                  onClick={async (e) => {
                    e.preventDefault();
                    await submeter();
                  }}
                >
                  {processando ? "Salvando..." : "Alterar nome"}
                </button>
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
                  labelText="Senha atual"
                />
              </div>
              <div className="perfilUsuario__space-y-2">
                <CampoSenha
                  id="novasenha"
                  placeholder="Nova senha"
                  value={novaSenha}
                  onChangeText={setNovaSenha}
                  labelText="Nova senha"
                />
              </div>
              <div className="perfilUsuario__space-y-2">
                <CampoSenha
                  id="confirmenovasenha"
                  placeholder="Confirme a nova senha"
                  value={confirmaNovaSenha}
                  onChangeText={setConfirmaNovaSenha}
                  labelText="Confirme a nova senha"
                />
              </div>
              <div className="perfilUsuario__flex perfilUsuario__flex-col perfilUsuario__space-y-4 perfilUsuario__padding-top-6 perfilUsuario__w-full">
                <button
                  className="perfilUsuario__form-button-green perfilUsuario__w-full"
                  disabled={processando}
                  onClick={async (e) => {
                    e.preventDefault();
                    await submeterSenha();
                  }}
                >
                  {processando ? "Salvando..." : "Alterar senha"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
