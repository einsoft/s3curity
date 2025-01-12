import CasoDeUso from "../../shared/CasoDeUso";
import RepositorioUsuario from "../provider/RepositorioUsuario";

type Entrada = {
  id: number;
  nomeCompleto: string;
};

export default class AtualizarNomeUsuario implements CasoDeUso<Entrada, void> {
  constructor(
    private readonly repo: RepositorioUsuario
  ) {}

  async executar(entrada: Entrada): Promise<void> {
    
    if (entrada.nomeCompleto?.length <= 3){
      throw new Error("nome inválido");
    }

    const usuarioDB = await this.repo.buscarPorId(entrada.id);

    if (!usuarioDB) {
      throw new Error("Usuário não existe");
    }

    await this.repo.atualizarNome(usuarioDB.id, entrada.nomeCompleto);
  }
}
