import Permissao from "../model/Permissao";

export default interface RepositorioPermissao {
  listar(limite: number, offset: number): Promise<Permissao[]>;
  salvar(permissao: Permissao): Promise<void>;
  buscarPorId(id: number): Promise<Permissao | null>;
  atualizar(id: number, permissao: Permissao): Promise<void>;
  excluir(id: number): Promise<void>;
}
