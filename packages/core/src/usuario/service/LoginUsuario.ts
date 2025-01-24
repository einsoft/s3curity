import CasoDeUso from '../../shared/CasoDeUso';
import { Usuario } from '../model/Usuario';
import ProvedorCriptografia from '../provider/ProvedorCriptogafia';
import RepositorioUsuario from '../provider/RepositorioUsuario';

type Entrada = {
  email: string;
  senha: string;
};

export default class LoginUsuario implements CasoDeUso<Entrada, Usuario> {
  constructor(
    private readonly repo: RepositorioUsuario,
    private readonly cripto: ProvedorCriptografia
  ) {}

  async executar(entrada: Entrada): Promise<Usuario> {
    const { email, senha } = entrada;
    const usuario = await this.repo.buscarPorEmail(email);
    const mesmaSenha = await this.cripto.comparar(senha, usuario.senha);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    if (!mesmaSenha) {
      throw new Error("Senha incorreta");
    }

    delete usuario.senha;

    return usuario;
  }
}
