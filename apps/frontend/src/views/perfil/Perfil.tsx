import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Cabecalho from "@/src/components/shared/Cabecalho";
import CampoEmail from "@/src/components/shared/formulario/CampoEmail";
import CampoSenha from "@/src/components/shared/formulario/CampoSenha";
import CampoTexto from "@/src/components/shared/formulario/CampoTexto";
import useFormPerfil from "@/src/data/hooks/useFormPerfil";
import useSessao from "@/src/data/hooks/useSessao";

export default function Perfil() {
  const { usuario } = useSessao();
  const { setNome, submeter, processando, email } = useFormPerfil();

  return (
    <div className="container mt-16">
      <Cabecalho />
      <div className="formulario__container">
        <header>
          <div className="flex items-center space-x-3">
            <Image
              src={usuario?.imagemPerfil ? usuario?.imagemPerfil : "/avatar.svg"}
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
        <div className="space-y-8">
          <Card className="bg-[#A1A1AA1A] border-dashed border-2 border-[#A1A1AA1A]">
            <div className="formulario__container--logotipo text-zinc-500">Informações principais</div>
            <CardContent className="space-y-6">
              <div className="space-y-2 pt-4">
                <CampoTexto
                  value={usuario?.nomeCompleto || ""}
                  placeholder="Nome completo"
                  onChangeText={setNome}
                  labelText="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <CampoEmail placeholder="E-mail principal" value={email} labelText="E-mail" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#A1A1AA1A] border-dashed border-2 border-[#A1A1AA1A]">
            <div className="formulario__container--logotipo text-zinc-500">Mudar a senha</div>
            <CardHeader className="formulario__container--aviso">
              <div>Para sua segurança, não compartilhe sua senha com outras pessoas.</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <CampoSenha id="senha" placeholder="Senha atual" value="" labelText="Senha atual" />
              </div>
              <div className="space-y-2">
                <CampoSenha id="novasenha" placeholder="Nova senha" value="" labelText="Nova senha" />
              </div>
              <div className="space-y-2">
                <CampoSenha
                  id="confirmenovasenha"
                  placeholder="Confirme a nova senha"
                  value=""
                  labelText="Confirme a nova senha"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="pt-6 flex justify-center bg w-full">
          <button
            className="form__button--green w-full"
            disabled={processando}
            onClick={async (e) => {
              e.preventDefault();
              await submeter();
            }}
          >
            {processando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
