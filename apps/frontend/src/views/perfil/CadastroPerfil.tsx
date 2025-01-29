import { Button } from "@/src/components/ui/button";
import styles from "./perfil.module.css";

export default function CadastroPerfil() {
  return (
    <div className="flex flex-col bg-zinc-900 text-white p-6 rounded-xl shadow-lg w-full">
      <div className="mb-4 w-full">
        <label
          className="block text-sm font-medium text-gray-400"
          htmlFor="nome"
        >
          Nome perfil
        </label>
        <input
          id="nome"
          type="text"
          value="cadastrar novo perfil (incluir)"
          className="w-full mt-1 p-2 bg-zinc-800 rounded-md border border-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4  w-full">
        <label
          className="block text-sm font-medium text-gray-400"
          htmlFor="descricao"
        >
          Descrição perfil
        </label>
        <input
          id="descricao"
          type="text"
          value="Ao utilizar a interface da aplicação administrativa, o usuário pode..."
          readOnly
          className="w-full mt-1 p-2 bg-zinc-800 rounded-md border border-zinc-700 text-gray-300 truncate focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 w-full">
        <label className="block text-sm font-medium text-gray-400" htmlFor="id">
          Status
        </label>
        <input
          id="id"
          type="text"
          value="status-perfil"
          readOnly
          className="w-full mt-1 p-2 bg-zinc-800 rounded-md border border-zinc-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button className={`${styles.perfil__button_salvar} w-1/3 self-center`}>
        Salvar
      </Button>
    </div>
  );
}
