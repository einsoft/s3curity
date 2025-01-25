import CasoDeUso from "../../shared/CasoDeUso";
import { Usuario } from "../model/Usuario";
import ProvedorCriptografia from "../provider/ProvedorCriptogafia";
import RepositorioUsuario from "../provider/RepositorioUsuario";

type Entrada = {
  id: number;
  senhaAtual: string;
  novaSenha: string;
  confirmaNovaSenha: string;
  usuarioLogado: Usuario;
};

type Saida = {
  erro?: string;
};

export default class AtualizarSenhaUsuario
  implements CasoDeUso<Entrada, Saida>
{
  constructor(
    private readonly repo: RepositorioUsuario,
    private readonly cripto: ProvedorCriptografia,
  ) {}

  async executar(entrada: Entrada): Promise<Saida> {
    const { id, senhaAtual, novaSenha, confirmaNovaSenha, usuarioLogado } =
      entrada;

    if (novaSenha?.length <= 3) {
      return { erro: "Senha inválida: deve ter mais de 3 caracteres" };
    }

    if (!novaSenha || !confirmaNovaSenha) {
      return { erro: "Senha e confirmação são obrigatórias" };
    }

    const novaSenhaTrimmed = novaSenha.trim();
    const confirmaNovaSenhaTrimmed = confirmaNovaSenha.trim();

    if (novaSenhaTrimmed !== confirmaNovaSenhaTrimmed) {
      return { erro: "Confirmação de senha não confere" };
    }

    if (id != usuarioLogado.id) {
      return { erro: "Não é possível alterar senha de outro usuário" };
    }

    const usuarioDB = await this.repo.buscarPorId(id);
    if (!usuarioDB) {
      return { erro: "Usuário não existe" };
    }

    const mesmaSenha = await this.cripto.comparar(senhaAtual, usuarioDB.senha);
    if (!mesmaSenha) {
      return { erro: "Senha incorreta" };
    }

    const senhaCriptografada = await this.cripto.criptografar(novaSenha);
    await this.repo.atualizarSenha(usuarioDB.id, senhaCriptografada);

    return {};
  }
}
