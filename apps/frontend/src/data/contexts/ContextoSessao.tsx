"use client";

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { Usuario } from "@s3curity/core";
import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Definições de tipos
interface JWTPayload {
  id: number;
  nomeCompleto: string;
  email: string;
  dataCriacao: string;
  exp: number;
  telefone?: string;
}

class TokenRefreshError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TokenRefreshError";
  }
}

const COOKIE_CONFIG = {
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
} as const;

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
    if (subscribers.current.size === 0) return;
    queueMicrotask(() => {
      subscribers.current.forEach((callback) => callback());
    });
  }, []);

  function validarToken(token: string): boolean {
    try {
      const payload = jwtDecode<JWTPayload>(token);
      return !!(
        payload.exp &&
        payload.id &&
        payload.email &&
        payload.exp > Date.now() / 1000
      );
    } catch {
      return false;
    }
  }

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
        const error = await response.text();
        throw new TokenRefreshError(error || "Erro ao atualizar token");
      }
    } catch (error) {
      if (error instanceof TokenRefreshError) {
        console.error("Erro ao atualizar token:", error.message);
      } else {
        console.error("Erro de rede ao atualizar token:", error);
      }
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
      if (!validarToken(token)) {
        if (refreshToken) {
          // Token inválido mas tem refresh token, tenta atualizar
          atualizarToken();
          return {
            token: null,
            refreshToken,
            usuario: null,
          };
        }
        // Token inválido e sem refresh token, limpa cookies
        cookie.remove(nomeCookie, { ...COOKIE_CONFIG });
        cookie.remove(nomeRefreshCookie, { ...COOKIE_CONFIG });
        return {
          token: null,
          refreshToken: null,
          usuario: null,
        };
      }

      const payload = jwtDecode<JWTPayload>(token);
      return {
        token,
        refreshToken,
        usuario: {
          id: payload.id,
          nomeCompleto: payload.nomeCompleto,
          email: payload.email,
          dataCriacao: new Date(payload.dataCriacao),
          token,
          dataExpiracaoToken: new Date(payload.exp * 1000),
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

    const payload = jwtDecode<JWTPayload>(sessao.token);
    const expiresIn = payload.exp * 1000 - Date.now();
    const refreshTime = Math.max(0, expiresIn - 60000); // Atualiza 1 minuto antes de expirar

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
      // Validar token antes de atualizar cookies
      if (!validarToken(token)) {
        throw new Error("Token inválido");
      }

      const oldUsuario = sessao.usuario;

      // Atualizar cookies primeiro
      const encodedToken = encodeURIComponent(token);
      cookie.set(nomeCookie, encodedToken, {
        ...COOKIE_CONFIG,
        expires: 1,
      });
      cookie.set(nomeRefreshCookie, refreshToken, {
        ...COOKIE_CONFIG,
        expires: 30,
      });

      // Decodifica token e atualiza sessão imediatamente
      const payload = jwtDecode<JWTPayload>(token);
      const novaSessao: Sessao = {
        token,
        refreshToken,
        usuario: {
          id: payload.id,
          nomeCompleto: payload.nomeCompleto,
          email: payload.email,
          dataCriacao: new Date(payload.dataCriacao),
          token,
          dataExpiracaoToken: new Date(payload.exp * 1000),
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
    cookie.remove(nomeCookie, { ...COOKIE_CONFIG });
    cookie.remove(nomeRefreshCookie, { ...COOKIE_CONFIG });
    setSessao({ token: null, refreshToken: null, usuario: null });
    notifySubscribers();
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
