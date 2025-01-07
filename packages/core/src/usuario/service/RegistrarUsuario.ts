import CasoDeUso from "../../shared/CasoDeUso";
import Usuario from "../model/Usuario";
import ProvedorCriptografia from "../provider/ProvedorCriptogafia";
import RepositorioUsuario from "../provider/RepositorioUsuario";

export default class RegistrarUsuario implements CasoDeUso {
  constructor(
    private readonly repo: RepositorioUsuario,
    private readonly cripto: ProvedorCriptografia
  ) {}

  async executar(usuario: Usuario): Promise<any> {
    const usuarioExistente = await this.repo.buscarPorEmail(usuario.email);

    if (usuarioExistente) {
      throw new Error("Usuário já existe");
    }

    const senhaCriptografada = await this.cripto.criptografar(usuario.senha);

    const novoUsuario = {
      ...usuario,
      senha: senhaCriptografada,
    };

    await this.repo.salvar(novoUsuario);
  }
}
