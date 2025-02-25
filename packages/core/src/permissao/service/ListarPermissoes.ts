import CasoDeUso from '../../shared/CasoDeUso';
import Permissao from '../model/Permissao';
import RepositorioPermissao from '../provider/RepositorioPermissao';

type Entrada = {
  limite: number;
  offset: number;
};

export default class ListarPermissoes
  implements CasoDeUso<Entrada, Permissao[]>
{
  constructor(private readonly repo: RepositorioPermissao) {}

  async executar(entrada: Entrada): Promise<Permissao[]> {
    const { limite, offset } = entrada;

    if (limite <= 0 || limite > 100) {
      throw new Error("Limite deve estar entre 1 e 100.");
    }

    if (offset < 0) {
      throw new Error("Offset não pode ser negativo.");
    }

    return this.repo.listar(limite, offset);
  }
}
