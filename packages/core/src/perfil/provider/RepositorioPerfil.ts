import Perfil from "../model/Perfil";

export default interface RepositorioPerfil {
  salvar(perfil: Perfil): Promise<void>;
  listar(limite: number, offset: number): Promise<Perfil[]>;
}
