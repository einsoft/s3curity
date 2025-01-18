/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext } from "react";
import { Usuario } from "@s3curity/core";

interface ContextoSessaoProps {
  usuario: Usuario | null;
}

const ContextoSessao = createContext<ContextoSessaoProps>({} as any);
export default ContextoSessao;

export function ProvedorSessao(props: any) {
  return (
    <ContextoSessao.Provider
      value={{
        usuario: {
          id: 10,
          nomeCompleto: "string",
          email: "string",
          dataCriacao: new Date(Date.now()),
          token: "string",
          dataExpiracaoToken: new Date(Date.now()),
          telefone: "string",
        },
      }}
    >
      {props.children}
    </ContextoSessao.Provider>
  );
}
