import Image from "next/image";
import Link from "next/link";
import { IconHome, IconLogout, IconUser } from "@tabler/icons-react";

import useSessao from "@/src/data/hooks/useSessao";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function MenuUsuario() {
  const { usuario, encerrarSessao } = useSessao();

  return usuario ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="font-bold">{usuario?.nomeCompleto}</span>
            <span className="text-zinc-400 text-xs">{usuario?.email}</span>
          </div>
          <div className="bg-zinc-700 w-10 h-10 p-1 rounded-full">
            <Image
              src={usuario.imagemPerfil ? usuario.imagemPerfil : "/avatar.svg"}
              height={40}
              width={40}
              alt="Usuário"
              priority={false}
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex gap-2">
          <IconHome size={18} />
          <Link href="/">Início</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2">
          <IconUser size={18} />
          <Link href="/perfilusuario">Perfil usuário</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={encerrarSessao}
          className="flex gap-2 text-red-500"
        >
          <IconLogout size={18} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
}
