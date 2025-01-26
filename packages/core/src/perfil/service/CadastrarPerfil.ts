import CasoDeUso from "../../shared/CasoDeUso";
import Perfil from "../model/Perfil";
import RepositorioPerfil from "../provider/RepositorioPerfil";

export default class CadastrarPerfil implements CasoDeUso<Perfil, void> {
  constructor(private readonly repo: RepositorioPerfil) {}

  async executar(perfil: Perfil): Promise<void> {
    const perfilExistente = await this.repo.buscarPorNome(perfil.nome);

    if (perfilExistente) {
      throw new Error("Perfil já existe");
    }

    const novoPerfil = {
      ...perfil,
      dataCriacao: new Date(),
      status: "ativo" as const,
    };

    await this.repo.salvar(novoPerfil);
  }
}
