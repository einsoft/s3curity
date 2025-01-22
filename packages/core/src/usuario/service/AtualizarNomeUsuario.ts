import CasoDeUso from "../../shared/CasoDeUso";
import Usuario from "../model/Usuario";
import RepositorioUsuario from "../provider/RepositorioUsuario";

type Entrada = {
  id: number;
  nomeCompleto: string;
  usuarioLogado: Usuario;
};

export default class AtualizarNomeUsuario implements CasoDeUso<Entrada, void> {
  constructor(private readonly repo: RepositorioUsuario) {}

  async executar(entrada: Entrada): Promise<void> {
    const { id, nomeCompleto, usuarioLogado } = entrada;

    if (id != usuarioLogado.id) {
      throw new Error("Não é possível alterar nome de outro usuário");
    }

    if (nomeCompleto?.length <= 3) {
      throw new Error("nome inválido");
    }

    const usuarioDB = await this.repo.buscarPorId(id);

    if (!usuarioDB) {
      throw new Error("Usuário não existe");
    }

    await this.repo.atualizarNome(usuarioDB.id, nomeCompleto);
  }
}
