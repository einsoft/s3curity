"use client";

import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";

import { Button } from "@/src/components/ui/button";
import { DataTablePagination } from "@/src/components/ui/datatable-pagination";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

// Modelo Perfil
interface Perfil {
  id: number;
  nome: string;
  descricao?: string;
  dataCriacao: Date;
  status: "ativo" | "inativo";
}

// Dados fictícios (para testes)
const perfis: Perfil[] = [
  {
    id: 1,
    nome: "Administrador",
    descricao: "Acesso total",
    dataCriacao: new Date(),
    status: "ativo",
  },
  {
    id: 2,
    nome: "Editor",
    descricao: "Pode editar conteúdos",
    dataCriacao: new Date(),
    status: "ativo",
  },
  {
    id: 3,
    nome: "Visualizador",
    descricao: "Somente leitura",
    dataCriacao: new Date(),
    status: "inativo",
  },
];

// Colunas da tabela
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

export default function PerfilTable() {
  const [search, setSearch] = useState("");

  const filteredPerfis = useMemo(() => {
    return perfis.filter((perfil) =>
      perfil.nome.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const table = useReactTable({
    data: filteredPerfis,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="perfil">
      {/* Barra de Pesquisa */}
      <div className="perfil__search-bar">
        <Input
          placeholder="Pesquisar Usuários"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="perfil__search-bar-input"
        />
      </div>

      {/* Tabela de Perfis */}
      <div className="perfil__table-container">
        <Table className="perfil__table">
          <TableHeader className="perfil__table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="perfil__table-header-row"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="perfil__table-header-cell"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="perfil__table-row">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="perfil__table-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="perfil__table-empty"
                >
                  Nenhum perfil encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="perfil__pagination">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
