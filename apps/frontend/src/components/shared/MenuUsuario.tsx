import Image from "next/image";

import useSessao from "@/src/data/hooks/useSessao";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function MenuUsuario() {
  const { usuario, encerrarSessao } = useSessao();

  return usuario ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex">
          <div className="flex flex-col">
            <span>{usuario?.nomeCompleto}</span>
            <span>{usuario?.email}</span>
          </div>
          <div>
            <Image src="/logo.svg" width={40} height={40} alt="Usuário" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={encerrarSessao}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
}
