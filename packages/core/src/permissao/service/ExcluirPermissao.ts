import CasoDeUso from "../../shared/CasoDeUso";
import Permissao from "../model/Permissao";
import RepositorioPermissao from "../provider/RepositorioPermissao";

export default class ExcluirPermissao implements CasoDeUso<Permissao, void> {
  constructor(private readonly repo: RepositorioPermissao) {}

  async executar(permissao: Permissao): Promise<void> {
    if (!permissao.id) {
      throw new Error("ID da permissão é obrigatório");
    }
    await this.repo.excluir(permissao.id);
  }
}
