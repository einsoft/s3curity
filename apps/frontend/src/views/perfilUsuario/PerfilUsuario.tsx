import Image from "next/image";

import Cabecalho from "@/src/components/shared/Cabecalho";
import CampoEmail from "@/src/components/shared/formulario/CampoEmail";
import CampoSenha from "@/src/components/shared/formulario/CampoSenha";
import CampoTexto from "@/src/components/shared/formulario/CampoTexto";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import useFormPerfil from "@/src/data/hooks/useFormPerfil";
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
    <div className="container mt-16">
      <Cabecalho />
      <div className="formulario__container">
        <header>
          <div className="flex items-center space-x-3">
            <Image
              src={
                usuario?.imagemPerfil ? usuario?.imagemPerfil : "/avatar.svg"
              }
              alt="Avatar"
              width="96"
              height="96"
              className="rounded-full mb-4"
              style={{ aspectRatio: "96/96", objectFit: "cover" }}
              priority={false}
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{usuario?.nomeCompleto}</h1>
              <Button>Mudar avatar</Button>
            </div>
          </div>
        </header>
        <div className="space-y-8 w-full">
          <Card className="bg-[#A1A1AA1A] border-dashed border-2 border-[#A1A1AA1A]">
            <div className="formulario__container-logotipo text-zinc-500">
              Informações principais
            </div>
            <CardContent className="space-y-6">
              <div className="space-y-2 pt-4">
                <CampoTexto
                  value={nome || ""}
                  placeholder="Nome completo"
                  onChangeText={setNome}
                  labelText="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <CampoEmail
                  placeholder="E-mail principal"
                  value={email}
                  labelText="E-mail"
                  disabled={true}
                />
              </div>
              <div className="pt-6 flex justify-center bg w-full">
                <button
                  className="form__button-green w-full"
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
            className="bg-[#A1A1AA1A] border-dashed border-2 border-[#A1A1AA1A]"
          >
            <div className="formulario__container-logotipo text-zinc-500">
              Mudar a senha
            </div>
            <CardHeader className="formulario__container-aviso">
              <div className={erroSenha ? "text-red-500" : ""}>
                {erroSenha ||
                  "Para sua segurança, não compartilhe sua senha com outras pessoas."}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <CampoSenha
                  id="senha"
                  placeholder="Senha atual"
                  value={senhaAtual}
                  onChangeText={setSenhaAtual}
                  labelText="Senha atual"
                />
              </div>
              <div className="space-y-2">
                <CampoSenha
                  id="novasenha"
                  placeholder="Nova senha"
                  value={novaSenha}
                  onChangeText={setNovaSenha}
                  labelText="Nova senha"
                />
              </div>
              <div className="space-y-2">
                <CampoSenha
                  id="confirmenovasenha"
                  placeholder="Confirme a nova senha"
                  value={confirmaNovaSenha}
                  onChangeText={setConfirmaNovaSenha}
                  labelText="Confirme a nova senha"
                />
              </div>
              <div className="flex flex-col space-y-4 pt-6 w-full">
                <button
                  className="form__button-green w-full"
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
