import { AtualizarPerfilDto } from "@backend/perfil/dto/atualizar-perfil.dto";

import CasoDeUso from "../../shared/CasoDeUso";
import Perfil from "../model/Perfil";
import RepositorioPerfil from "../provider/RepositorioPerfil";

export default class AtualizarPerfil
  implements CasoDeUso<AtualizarPerfilDto, void>
{
  constructor(private readonly repositorio: RepositorioPerfil) {}

  async executar(dados: AtualizarPerfilDto): Promise<void> {
    const perfilExistente = await this.repositorio.buscarPorId(dados.id);

    if (!perfilExistente) {
      throw new Error("Perfil não encontrado");
    }

    const perfilAtualizado: Perfil = {
      ...perfilExistente,
      nome: dados.nome ?? perfilExistente.nome,
      descricao: dados.descricao ?? perfilExistente.descricao,
      status: dados.status ?? perfilExistente.status,
      permissoes: dados.permissoes ?? perfilExistente.permissoes,
    };

    await this.repositorio.atualizar(dados.id, perfilAtualizado);
  }
}
