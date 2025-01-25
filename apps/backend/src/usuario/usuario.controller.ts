import * as jwt from 'jsonwebtoken';
import { BcryptProvider } from 'src/auth/bcrypt.provider';
import { UsuarioPrisma } from 'src/auth/usuario.prisma';
import { UsuarioLogado } from 'src/shared/usuario.decorator';

import { Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AtualizarNomeUsuario,
  AtualizarSenhaUsuario,
  Usuario,
} from '@s3curity/core';

import { AlterarSenhaDto } from './dto/alterar-senha.dto';
import { AtualizarNomeDto } from './dto/atualizar-nome.dto';

@ApiTags('Usuario')
@ApiBearerAuth()
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly repo: UsuarioPrisma,
    private readonly cripto: BcryptProvider,
  ) {}

  @Patch(':id/alterarNome')
  @HttpCode(204)
  @ApiOperation({ summary: 'Alterar o nome do usuário' })
  @ApiResponse({ status: 204, description: 'Nome alterado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async alterarNome(
    @Param('id') id: number,
    @Body() alterarNomeDto: AtualizarNomeDto,
    @UsuarioLogado() usuario: Usuario,
  ) {
    const casoDeUso = new AtualizarNomeUsuario(this.repo);

    const nomeCompleto = alterarNomeDto.nomeCompleto;
    const usuarioAtualizado = await casoDeUso.executar({
      id,
      nomeCompleto,
      usuarioLogado: usuario,
    });

    const segredoToken = process.env.JWT_SECRET;

    const novoToken = jwt.sign(usuarioAtualizado, segredoToken, {
      expiresIn: '15d',
    });

    return novoToken;
  }

  @Patch(':id/alterarSenha')
  @HttpCode(204)
  @ApiOperation({ summary: 'Alterar a senha do usuário' })
  @ApiResponse({ status: 204, description: 'Senha alterada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async alterarSenha(
    @Param('id') id: number,
    @Body()
    alterarSenhaDto: AlterarSenhaDto,
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
