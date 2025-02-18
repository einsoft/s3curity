"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { Usuario } from "@s3curity/core";
import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface Sessao {
  token: string | null;
  refreshToken: string | null;
  usuario: Usuario | null;
}

interface ContextoSessaoProps {
  carregando: boolean;
  token: string | null;
  usuario: Usuario | null;
  iniciarSessao: (token: string, refreshToken: string) => void;
  encerrarSessao: () => void;
  atualizarSessao: (token: string, refreshToken: string) => void;
}

const ContextoSessao = createContext<ContextoSessaoProps>({} as any);
export default ContextoSessao;

export function ProvedorSessao(props: any) {
  const nomeCookie = "_s3curity_token";
  const nomeRefreshCookie = "_s3curity_refresh_token";
  const [carregando, setCarregando] = useState(true);
  const [sessao, setSessao] = useState<Sessao>({
    token: null,
    refreshToken: null,
    usuario: null,
  });

  const atualizarToken = useCallback(async () => {
    const refreshToken = cookie.get(nomeRefreshCookie);
    if (!refreshToken) return;

    try {
      const response = await fetch("/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const { token, refreshToken: newRefreshToken } = await response.json();
        atualizarSessao(token, newRefreshToken);
      } else {
        encerrarSessao();
      }
    } catch (error) {
      console.error("Erro ao atualizar token:", error);
      encerrarSessao();
    }
  }, []);

  function obterSessao(): Sessao {
    const encodedToken = cookie.get(nomeCookie) || null;
    const refreshToken = cookie.get(nomeRefreshCookie) || null;

    if (!encodedToken) {
      return {
        token: null,
        refreshToken: null,
        usuario: null,
      };
    }

    try {
      const token = decodeURIComponent(encodedToken);
      const payload: any = jwtDecode(token);
      const valido = payload.exp! > Date.now() / 1000;

      if (!valido && refreshToken) {
        // Token expirado mas tem refresh token, tenta atualizar
        atualizarToken();
        return {
          token: null,
          refreshToken,
          usuario: null,
        };
      }

      if (!valido) {
        // Token expirado e sem refresh token, limpa cookies
        cookie.remove(nomeCookie);
        cookie.remove(nomeRefreshCookie);
        return {
          token: null,
          refreshToken: null,
          usuario: null,
        };
      }

      return {
        token,
        refreshToken,
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
    } catch (error: unknown) {
      console.error("Erro ao decodificar token:", error);
      return {
        token: null,
        refreshToken: null,
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

  // Configura um timer para atualizar o token antes de expirar
  useEffect(() => {
    if (!sessao.token) return;

    const payload: any = jwtDecode(sessao.token);
    const expiresIn = payload.exp * 1000 - Date.now();
    const refreshTime = expiresIn - 60000; // Atualiza 1 minuto antes de expirar

    if (refreshTime <= 0) {
      atualizarToken();
      return;
    }

    const timer = setTimeout(atualizarToken, refreshTime);
    return () => clearTimeout(timer);
  }, [sessao.token, atualizarToken]);

  async function atualizarSessao(token: string, refreshToken: string) {
    const encodedToken = encodeURIComponent(token);
    cookie.set(nomeCookie, encodedToken, {
      expires: 1,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    cookie.set(nomeRefreshCookie, refreshToken, {
      expires: 30,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    const sessao = obterSessao();
    setSessao(sessao);
  }

  function iniciarSessao(token: string, refreshToken: string) {
    const encodedToken = encodeURIComponent(token);
    cookie.set(nomeCookie, encodedToken, {
      expires: 1,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    cookie.set(nomeRefreshCookie, refreshToken, {
      expires: 30,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    const sessao = obterSessao();
    setSessao(sessao);
  }

  function encerrarSessao() {
    cookie.remove(nomeCookie);
    cookie.remove(nomeRefreshCookie);
    setSessao({ token: null, refreshToken: null, usuario: null });
  }

  return (
    <ContextoSessao.Provider
      value={{
        carregando,
        token: sessao.token,
        usuario: sessao.usuario,
        iniciarSessao,
        encerrarSessao,
        atualizarSessao,
      }}
    >
      {props.children}
    </ContextoSessao.Provider>
  );
}
