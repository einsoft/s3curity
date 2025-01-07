import Usuario from "../model/Usuario";

export default interface RepositorioUsuario {
  salvar(usuario: Usuario): Promise<void>;
  buscarPorEmail(email: string): Promise<any>;
}
