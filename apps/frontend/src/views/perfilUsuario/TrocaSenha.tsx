import Cabecalho from "@/src/components/shared/Cabecalho";
import CampoEmail from "@/src/components/shared/formulario/CampoEmail";
import Logo from "@/src/components/shared/logo/Logo";
import useSessao from "@/src/data/hooks/useSessao";

export default function TrocaSenha() {
  const { usuario } = useSessao();

  const submeter = () => {
    console.log("Submetendo...");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <Cabecalho />
      <div className="flex flex-col items-center w-full max-w-md p-6 space-y-6 bg-[#3f3f46] rounded-lg shadow-md">
        <Logo width={180} loading="eager" priority />
        <span className="text-xl font-semibold text-gray-200">
          Solicitar troca de senha
        </span>
        <CampoEmail
          placeholder="E-mail"
          value={usuario ? usuario.email : ""}
          onChangeText={(value) => console.log(value)}
        />
        <button
          onClick={submeter}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
