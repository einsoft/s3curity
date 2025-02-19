import { useEffect, useRef } from "react";

import useSessao from "./useSessao";

export default function useAPI() {
  const { token } = useSessao();
  const urlBase = process.env.NEXT_PUBLIC_API_URL;
  const abortControllers = useRef(new Set<AbortController>());

  useEffect(() => {
    return () => {
      abortControllers.current.forEach((controller) => controller.abort());
      abortControllers.current.clear();
    };
  }, []);

  async function extrairDados(resposta: Response) {
    const contentType = resposta.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await resposta.json();
      if (!resposta.ok) {
        throw {
          response: {
            data: data,
            status: resposta.status,
          },
        };
      }
      return data;
    }
    const text = await resposta.text();
    if (!resposta.ok) {
      throw new Error(text || "Erro na requisição");
    }
    return text;
  }

  function createController() {
    const controller = new AbortController();
    abortControllers.current.add(controller);
    return controller;
  }

  function removeController(controller: AbortController) {
    abortControllers.current.delete(controller);
  }

  async function httpGet(caminho: string) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    const urlCompleta = `${urlBase}${uri}`;

    const controller = createController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const resposta = await fetch(urlCompleta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        signal: controller.signal,
      });

      return await extrairDados(resposta);
    } finally {
      clearTimeout(timeoutId);
      removeController(controller);
    }
  }

  async function httpPost(caminho: string, body: any) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    const urlCompleta = `${urlBase}${uri}`;

    const controller = createController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const resposta = await fetch(urlCompleta, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      return await extrairDados(resposta);
    } finally {
      clearTimeout(timeoutId);
      removeController(controller);
    }
  }

  async function httpPatch(caminho: string, body: any) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    const urlCompleta = `${urlBase}${uri}`;

    const controller = createController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const resposta = await fetch(urlCompleta, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      return await extrairDados(resposta);
    } finally {
      clearTimeout(timeoutId);
      removeController(controller);
    }
  }

  async function httpDelete(caminho: string) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    const urlCompleta = `${urlBase}${uri}`;

    const controller = createController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const resposta = await fetch(urlCompleta, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        signal: controller.signal,
      });

      return await extrairDados(resposta);
    } finally {
      clearTimeout(timeoutId);
      removeController(controller);
    }
  }

  return { httpGet, httpPost, httpPatch, httpDelete };
}
