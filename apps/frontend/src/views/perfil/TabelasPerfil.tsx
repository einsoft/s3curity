"use client";

import { useState } from "react";
import { Perfil } from "@s3curity/core";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import columns from "./ColunasTabela";
import Paginacao from "./Paginacao";
import Procura from "./Procura";

export default function TabelasPerfil() {
  const [filteredPerfis, setFilteredPerfis] = useState<Perfil[]>([]);

  const table = useReactTable({
    data: filteredPerfis,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="perfil">
      <Procura onSearch={setFilteredPerfis} />

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

      <Paginacao table={table} />
    </div>
  );
}
