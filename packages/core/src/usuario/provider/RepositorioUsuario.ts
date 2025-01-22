import Usuario from "../model/Usuario";

export default interface RepositorioUsuario {
  salvar(usuario: Usuario): Promise<void>;
  buscarPorEmail(email: string): Promise<any>;
  buscarPorId(id: number): Promise<any>;
  atualizarNome(id: number, nomeCompleto: string): Promise<void>;
  atualizarSenha(id: number, novaSenha: string): Promise<void>;
}
