"use client";

import "./perfil.css";

import { Perfil } from "@s3curity/core";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Button } from "@/src/components/ui/button";

const columns: ColumnDef<Perfil>[] = [
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
            ? "perfil__status-active"
            : "perfil__status-inactive"
        }
      >
        {row.getValue("status")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Ações",
    cell: () => (
      <div className="flex justify-center">
        <Button className="perfil__button-edit">Editar</Button>
        <Button className="perfil__button-delete">Excluir</Button>
      </div>
    ),
  },
];

export default columns;
