import CasoDeUso from "../../shared/CasoDeUso";
import Perfil from "../model/Perfil";
import RepositorioPerfil from "../provider/RepositorioPerfil";

type Entrada = {
  limite: number;
  offset: number;
};

export default class ListarPerfis implements CasoDeUso<Entrada, Perfil[]> {
  constructor(private readonly repo: RepositorioPerfil) {}

  async executar(entrada: Entrada): Promise<Perfil[]> {
    const { limite, offset } = entrada;

    if (limite <= 0 || limite > 100) {
      throw new Error("Limite deve estar entre 1 e 100");
    }

    if (offset < 0) {
      throw new Error("Offset não pode ser negativo");
    }

    return this.repo.listar(limite, offset);
  }
}
