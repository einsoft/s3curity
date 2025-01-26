import * as jwt from 'jsonwebtoken';
import { BcryptProvider } from 'src/auth/bcrypt.provider';
import { UsuarioLogado } from 'src/shared/usuario.decorator';
import { UsuarioPrisma } from 'src/usuario/usuario.prisma';

import { Body, Controller, Param, Patch } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Alterar o nome do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Nome alterado com sucesso. Retorna novo token JWT',
    schema: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  })
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
  @ApiOperation({ summary: 'Alterar a senha do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Senha alterada com sucesso. Retorna novo token JWT',
    schema: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async alterarSenha(
    @Param('id') id: number,
    @Body()
    alterarSenhaDto: AlterarSenhaDto,
    @UsuarioLogado() usuario: Usuario,
  ) {
    const casoDeUso = new AtualizarSenhaUsuario(this.repo, this.cripto);
    const resultado = await casoDeUso.executar({
      id: id,
      senhaAtual: alterarSenhaDto.senhaAtual,
      novaSenha: alterarSenhaDto.novaSenha,
      confirmaNovaSenha: alterarSenhaDto.confirmaNovaSenha,
      usuarioLogado: usuario,
    });

    if (resultado.erro) {
      return {
        success: false,
        error: {
          code: 400,
          category: 'VALIDATION',
          type: 'HttpException',
          message: resultado.erro,
          timestamp: new Date().toISOString(),
          path: `/usuario/${id}/alterarSenha`,
          details: {
            method: 'PATCH',
            headers: {
              'user-agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            },
            body: alterarSenhaDto,
          },
        },
      };
    }

    const usuarioAtualizado = await this.repo.buscarPorId(id);
    const segredoToken = process.env.JWT_SECRET;
    const novoToken = jwt.sign(usuarioAtualizado, segredoToken, {
      expiresIn: '15d',
    });

    return {
      success: true,
      token: novoToken,
    };
  }
}
