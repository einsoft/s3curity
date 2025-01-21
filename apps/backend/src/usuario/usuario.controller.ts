import { Body, Controller, HttpCode, Param, Patch, Put } from '@nestjs/common';
import {
  AtualizarNomeUsuario,
  AtualizarSenhaUsuario,
  Usuario,
} from '@s3curity/core';
import { UsuarioLogado } from 'src/shared/usuario.decorator';
import { UsuarioPrisma } from 'src/auth/usuario.prisma';
import { BcryptProvider } from 'src/auth/bcrypt.provider';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly repo: UsuarioPrisma,
    private readonly cripto: BcryptProvider,
  ) {}

  @Patch(':id/alterarNome')
  @HttpCode(204)
  async alterarNome(
    @Param('id') id: number,
    @Body() alterarNomeDto: { nomeCompleto: string },
    @UsuarioLogado() usuario: Usuario,
  ) {
    const casoDeUso = new AtualizarNomeUsuario(this.repo);

    const nomeCompleto = alterarNomeDto.nomeCompleto;
    return await casoDeUso.executar({
      id,
      nomeCompleto,
      usuarioLogado: usuario,
    });
  }

  @Patch(':id/alterarSenha')
  @HttpCode(204)
  async alterarSenha(
    @Param('id') id: number,
    @Body()
    alterarSenhaDto: {
      senhaAtual: string;
      novaSenha: string;
      confirmaNovaSenha: string;
      usuarioLogado: Usuario;
    },
    @UsuarioLogado() usuario: Usuario,
  ) {
    const casoDeUso = new AtualizarSenhaUsuario(this.repo, this.cripto);
    return await casoDeUso.executar({
      id: id,
      senhaAtual: alterarSenhaDto.senhaAtual,
      novaSenha: alterarSenhaDto.novaSenha,
      confirmaNovaSenha: alterarSenhaDto.confirmaNovaSenha,
      usuarioLogado: usuario,
    });
  }
}
