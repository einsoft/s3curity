import Perfil from "../model/Perfil";

export default interface RepositorioPerfil {
  salvar(perfil: Perfil): Promise<void>;
  buscarPorId(id: number): Promise<Perfil | null>;
  buscarPorNome(nome: string): Promise<Perfil | null>;
  listarTodos(): Promise<Perfil[]>;
  atualizarStatus(id: number, status: "ativo" | "inativo"): Promise<void>;
  adicionarPermissoes(idPerfil: number, idsPermissoes: number[]): Promise<void>;
  removerPermissoes(idPerfil: number, idsPermissoes: number[]): Promise<void>;
}
