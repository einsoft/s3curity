"use client";

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { Usuario } from "@s3curity/core";
import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface Sessao {
  token: string | null;
  refreshToken: string | null;
  usuario: Usuario | null;
}

type Subscriber = () => void;

interface ContextoSessaoProps {
  carregando: boolean;
  token: string | null;
  usuario: Usuario | null;
  iniciarSessao: (token: string, refreshToken: string) => void;
  encerrarSessao: () => void;
  atualizarSessao: (token: string, refreshToken: string) => void;
  atualizarUsuario: (
    novoUsuario: Partial<Usuario> & { token?: string; refreshToken?: string },
  ) => void;
  subscribe: (callback: () => void) => () => void;
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

  // Subscriber management
  const subscribers = useRef<Set<Subscriber>>(new Set());

  const subscribe = useCallback((callback: Subscriber) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  const notifySubscribers = useCallback(() => {
    subscribers.current.forEach((callback) => callback());
  }, []);

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
    if (!token || !refreshToken) {
      console.error("Token e refreshToken são necessários");
      return;
    }

    try {
      const oldUsuario = sessao.usuario;

      // Update cookies first
      const encodedToken = encodeURIComponent(token);
      cookie.set(nomeCookie, encodedToken, {
        expires: 1,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      cookie.set(nomeRefreshCookie, refreshToken, {
        expires: 30,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      // Decode token and update session immediately
      const payload: any = jwtDecode(token);
      const novaSessao: Sessao = {
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
      setSessao(novaSessao);

      if (oldUsuario?.nomeCompleto !== novaSessao.usuario?.nomeCompleto) {
        notifySubscribers();
      }
    } catch (error) {
      console.error("Erro ao atualizar sessão:", error);
      encerrarSessao();
    }
  }

  function iniciarSessao(token: string, refreshToken: string) {
    atualizarSessao(token, refreshToken);
  }

  function encerrarSessao() {
    cookie.remove(nomeCookie, { path: "/" });
    cookie.remove(nomeRefreshCookie, { path: "/" });
    setSessao({ token: null, refreshToken: null, usuario: null });
  }

  function atualizarUsuario(
    novoUsuario: Partial<Usuario> & { token?: string; refreshToken?: string },
  ) {
    if (!sessao.usuario) return;

    const { token, refreshToken, ...dadosUsuario } = novoUsuario;

    // If token and refreshToken are provided, update session first
    if (token && refreshToken) {
      atualizarSessao(token, refreshToken);
      return; // atualizarSessao will handle the user update
    }

    // Otherwise just update user data
    const oldNome = sessao.usuario.nomeCompleto;
    setSessao({
      ...sessao,
      usuario: { ...sessao.usuario, ...dadosUsuario },
    });
    if (oldNome !== dadosUsuario.nomeCompleto) {
      notifySubscribers();
    }
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
        atualizarUsuario,
        subscribe,
      }}
    >
      {props.children}
    </ContextoSessao.Provider>
  );
}
