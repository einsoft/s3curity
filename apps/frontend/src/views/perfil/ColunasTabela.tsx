"use client";

import { Perfil } from "@s3curity/core";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Button } from "@/src/components/ui/button";
import usePerfil from "@/src/data/hooks/usePerfil";
import styles from "./perfil.module.css";

export default function usePerfilColumns(): ColumnDef<Perfil>[] {
  const { deletePerfil, processando } = usePerfil();

  return [
    {
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }) => <span>{row.getValue("nome")}</span>,
    },
    {
      accessorKey: "descricao",
      header: "Descrição",
      cell: ({ row }) => (
        <span>{row.getValue("descricao") || "Sem descrição"}</span>
      ),
    },
    {
      accessorKey: "dataCriacao",
      header: "Data de Criação",
      cell: ({ row }) => (
        <span>
          {format(new Date(row.getValue("dataCriacao")), "dd/MM/yyyy HH:mm")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={
            row.getValue("status") === "ativo"
              ? styles.perfil__status_active
              : styles.perfil__status_inactive
          }
        >
          {row.getValue("status")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Button className={styles.perfil__button_edit}>Editar</Button>
          <Button
            className={styles.perfil__button_delete}
            onClick={() => {
              if (row.original.id) {
                deletePerfil(row.original.id);
              }
            }}
            disabled={processando}
          >
            {processando ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      ),
    },
  ] as ColumnDef<Perfil>[];
}
