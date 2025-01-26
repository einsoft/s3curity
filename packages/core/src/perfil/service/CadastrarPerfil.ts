import CasoDeUso from "../../shared/CasoDeUso";
import Perfil from "../model/Perfil";
import RepositorioPerfil from "../provider/RepositorioPerfil";

export default class CadastrarPerfil implements CasoDeUso<Perfil, void> {
  constructor(private readonly repo: RepositorioPerfil) {}

  async executar(perfil: Perfil): Promise<void> {}
}
