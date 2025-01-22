"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { Usuario } from "@s3curity/core";
import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface Sessao {
  token: string | null;
  usuario: Usuario | null;
}

interface ContextoSessaoProps {
  carregando: boolean;
  token: string | null;
  usuario: Usuario | null;
  iniciarSessao: (token: string) => void;
  encerrarSessao: () => void;
}

const ContextoSessao = createContext<ContextoSessaoProps>({} as any);
export default ContextoSessao;

export function ProvedorSessao(props: any) {
  const nomeCookie = "_s3curity_token";
  const [carregando, setCarregando] = useState(true);
  const [sessao, setSessao] = useState<Sessao>({ token: null, usuario: null });

  function obterSessao(): Sessao {
    const token = cookie.get(nomeCookie);

    if (!token) {
      return {
        token: null,
        usuario: null,
      };
    }

    try {
      const payload: any = jwtDecode(token);
      const valido = payload.exp! > Date.now() / 1000;

      if (!valido) {
        cookie.remove(nomeCookie);
        return {
          token: null,
          usuario: null,
        };
      }

      return {
        token,
        usuario: {
          id: payload.id,
          nomeCompleto: payload.nomeCompleto,
          email: payload.email,
          dataCriacao: new Date(payload.dataCriacao),
          token,
          dataExpiracaoToken: new Date(payload.exp! * 1000),
          telefone: payload.telefone,
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        token: null,
        usuario: null,
      };
    }
  }

  const carregarSessao = useCallback(() => {
    try {
      setCarregando(true);
      const sessao = obterSessao();
      setSessao(sessao);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarSessao();
  }, [carregarSessao]);

  function iniciarSessao(token: string) {
    cookie.set(nomeCookie, token, { expires: 1 });
    const sessao = obterSessao();
    setSessao(sessao);
  }

  function encerrarSessao() {
    cookie.remove(nomeCookie);
    setSessao({ token: null, usuario: null });
  }

  return (
    <ContextoSessao.Provider
      value={{
        carregando,
        token: sessao.token,
        usuario: sessao.usuario,
        iniciarSessao,
        encerrarSessao,
      }}
    >
      {props.children}
    </ContextoSessao.Provider>
  );
}
