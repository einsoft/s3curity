export default function useAPI() {
  const urlBase = process.env.NEXT_PUBLIC_API_URL;

  async function httpGet(caminho: string) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    const urlCompleta = `${urlBase}${uri}`;
    const resposta = await fetch(urlCompleta);

    return extrairDados(resposta);
  }

  async function httpPost(caminho: string, body: any) {
    const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
    const urlCompleta = `${urlBase}${uri}`;
    const resposta = await fetch(urlCompleta, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return extrairDados(resposta);
  }

  async function extrairDados(resposta: Response) {
    let conteudo = "";
    try {
      conteudo = await resposta.text();
      return JSON.parse(conteudo);
    } catch (e) {
      console.log(e);
      return conteudo;
    }
  }

  return { httpGet, httpPost };
}
