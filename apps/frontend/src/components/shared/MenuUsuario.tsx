import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconActivity,
  IconHome,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";

import useSessao from "@/src/data/hooks/useSessao";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function MenuUsuario() {
  const [, forceUpdate] = useState({});
  const { usuario, encerrarSessao, subscribe } = useSessao();

  useEffect(() => {
    // Subscribe to session changes
    const unsubscribe = subscribe(() => forceUpdate({}));
    return () => unsubscribe();
  }, [subscribe]);

  useEffect(() => {
    const handleMenuToggle = (event: Event) => {
      const cabecalho = document.querySelector(".cabecalho__container");
      if (cabecalho) {
        if (event.type === "click") {
          cabecalho.classList.add("fixed");
        } else if (event.type === "blur") {
          cabecalho.classList.remove("fixed");
        }
      }
    };

    const dropdownTrigger = document.querySelector(
      "[data-radix-popper-trigger]",
    );
    if (dropdownTrigger) {
      dropdownTrigger.addEventListener("click", handleMenuToggle);
      dropdownTrigger.addEventListener("blur", handleMenuToggle);
    }

    return () => {
      if (dropdownTrigger) {
        dropdownTrigger.removeEventListener("click", handleMenuToggle);
        dropdownTrigger.removeEventListener("blur", handleMenuToggle);
      }
    };
  }, []);

  return usuario ? (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={() => {
          const cabecalho = document.querySelector(".cabecalho__container");
          if (cabecalho) {
            cabecalho.classList.add("fixed");
          }
        }}
      >
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
          <IconActivity size={18} />
          <Link href="/perfil">Grupos</Link>
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
