import Perfil from "../model/Perfil";

export default interface RepositorioPerfil {
  listar(limite: number, offset: number): Promise<Perfil[]>;
  salvar(perfil: Perfil): Promise<void>;
  buscarPorId(id: number): Promise<Perfil | null>;
  atualizar(id: number, perfil: Perfil): Promise<void>;
  excluir(id: number): Promise<void>;
}
