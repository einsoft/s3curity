import CasoDeUso from "../../shared/CasoDeUso";
import Permissao from "../model/Permissao";
import RepositorioPermissao from "../provider/RepositorioPermissao";

type Entrada = {
  nome: string;
  descricao: string;
};

export default class CadastrarPermissao
  implements CasoDeUso<Entrada, Permissao>
{
  constructor(private readonly repo: RepositorioPermissao) {}

  async executar(entrada: Entrada): Promise<Permissao> {
    const { nome, descricao } = entrada;

    if (!nome || nome.length < 3) {
      throw new Error("Nome da permissão inválido!");
    }

    if (!descricao || descricao.length < 5) {
      throw new Error("Descrição da permissão inválida!");
    }

    const permissao: Permissao = {
      id: 0, // Será gerado pelo banco
      nome,
      descricao,
      status: "ativo",
      dataCadastro: new Date(),
    };

    await this.repo.salvar(permissao);
    return permissao;
  }
}
