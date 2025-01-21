
import CasoDeUso from "../../shared/CasoDeUso";
import Usuario from "../model/Usuario";
import ProvedorCriptografia from "../provider/ProvedorCriptogafia";
import RepositorioUsuario from "../provider/RepositorioUsuario";

type Entrada = {
  id: number;
  senhaAtual: string;
  novaSenha: string;
  confirmaNovaSenha: string;
  usuarioLogado: Usuario
};

export default class AtualizarSenhaUsuario implements CasoDeUso<Entrada, void> {
  constructor(
    private readonly repo: RepositorioUsuario,
    private readonly cripto: ProvedorCriptografia
  ) {}

  async executar(entrada: Entrada): Promise<void> {
    const { id, senhaAtual, novaSenha, confirmaNovaSenha, usuarioLogado } = entrada;
   
    if (novaSenha?.length <= 3){
      throw new Error("Senha inválido");
    }

    if(novaSenha !== confirmaNovaSenha){
      throw new Error("Confirmação de senha não confere");
    }

    if(id != usuarioLogado.id){
      throw new Error('Não é possível alterar senha de outro usuário');
    }

    const usuarioDB = await this.repo.buscarPorId(id);
    if (!usuarioDB) {
      throw new Error("Usuário não existe");
    }
  
    const mesmaSenha = await this.cripto.comparar(senhaAtual, usuarioDB.senha);
    if (!mesmaSenha) {
      throw new Error("Senha incorreta");
    }

    const senhaCriptografada = await this.cripto.criptografar(novaSenha);
    await this.repo.atualizarSenha(usuarioDB.id, senhaCriptografada);
  }
}
