import { Usuario } from '../model/Usuario';

export default interface RepositorioUsuario {
  salvar(usuario: Usuario): Promise<void>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  buscarPorId(id: number): Promise<Usuario | null>;
  atualizarNome(id: number, nomeCompleto: string): Promise<void>;
  atualizarSenha(id: number, novaSenha: string): Promise<void>;
}
