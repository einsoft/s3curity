"use client";

import { Table } from "@tanstack/react-table";

import { DataTablePagination } from "@/src/components/ui/datatable-pagination";
import styles from "./perfil.module.css";

interface PaginacaoProps {
  table: Table<any>;
}

export default function Paginacao({ table }: PaginacaoProps) {
  return (
    <div className={styles.perfil__paginacao}>
      <DataTablePagination table={table} />
    </div>
  );
}
