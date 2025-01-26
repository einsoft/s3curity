import CasoDeUso from "../../shared/CasoDeUso";
import Perfil from "../model/Perfil";
import RepositorioPerfil from "../provider/RepositorioPerfil";

type Entrada = {
  nome: string;
  descricao: string;
};

export default class CadastrarPerfil implements CasoDeUso<Entrada, Perfil> {
  constructor(private readonly repo: RepositorioPerfil) {}

  async executar(entrada: Entrada): Promise<Perfil> {
    const { nome, descricao } = entrada;

    if (!nome || nome.length < 3) {
      throw new Error("Nome do perfil inválido");
    }

    if (!descricao || descricao.length < 5) {
      throw new Error("Descrição do perfil inválida");
    }

    const perfil: Perfil = {
      id: 0, // Será gerado pelo banco
      nome,
      descricao,
      status: "ativo",
      dataCriacao: new Date(),
      permissoes: [],
    };

    await this.repo.salvar(perfil);
    return perfil;
  }
}
