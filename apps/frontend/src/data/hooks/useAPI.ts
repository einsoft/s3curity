import useSessao from "./useSessao";

export default function useAPI() {
  const { token } = useSessao();
  const urlBase = process.env.NEXT_PUBLIC_API_URL;

  async function extrairDados(resposta: Response) {
    let conteudo = "";
    try {
      conteudo = await resposta.text();
      return JSON.parse(conteudo);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return conteudo;
    }
  }

  async function httpGet(caminho: string) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    const urlCompleta = `${urlBase}${uri}`;
    const resposta = await fetch(urlCompleta, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Added credentials
    });

    return extrairDados(resposta);
  }

  async function httpPost(caminho: string, body: any) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    const urlCompleta = `${urlBase}${uri}`;
    const resposta = await fetch(urlCompleta, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Added credentials
      body: JSON.stringify(body),
    });

    if (!resposta.ok) {
      const errorData = await resposta.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro na requisição");
    }

    return extrairDados(resposta);
  }

  async function httpPatch(caminho: string, body: any) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    const urlCompleta = `${urlBase}${uri}`;
    const resposta = await fetch(urlCompleta, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // Added credentials
      body: JSON.stringify(body),
    });

    return extrairDados(resposta);
  }

  async function httpDelete(caminho: string) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    const urlCompleta = `${urlBase}${uri}`;
    const resposta = await fetch(urlCompleta, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!resposta.ok) {
      const errorData = await resposta.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro na requisição");
    }

    return extrairDados(resposta);
  }

  return { httpGet, httpPost, httpPatch, httpDelete };
}
