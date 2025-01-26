import Perfil from "../model/Perfil";

export default interface RepositorioPerfil {
  salvar(perfil: Perfil): Promise<void>;
}
