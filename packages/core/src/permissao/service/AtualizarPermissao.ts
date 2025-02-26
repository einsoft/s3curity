import { AtualizarPermissaoDto } from "@backend/permissao/dto/atualizar-permissao.dto";

import CasoDeUso from "../../shared/CasoDeUso";
import Permissao from "../model/Permissao";
import RepositorioPermissao from "../provider/RepositorioPermissao";

export default class AtualizarPermissao
  implements CasoDeUso<AtualizarPermissaoDto, void>
{
  constructor(private readonly repositorio: RepositorioPermissao) {}

  async executar(dados: AtualizarPermissaoDto): Promise<void> {
    const permissaoExistente = await this.repositorio.buscarPorId(dados.id);

    if (!permissaoExistente) {
      throw new Error("Permissão não encontrada!");
    }

    const permissaoAtualizada: Permissao = {
      ...permissaoExistente,
      nome: dados.nome ?? permissaoExistente.nome,
      descricao: dados.descricao ?? permissaoExistente.descricao,
      status: dados.status ?? permissaoExistente.status,
    };

    await this.repositorio.atualizar(dados.id, permissaoAtualizada);
  }
}
