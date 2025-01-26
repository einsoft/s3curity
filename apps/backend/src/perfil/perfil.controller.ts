import { CriarPerfilDto } from 'src/perfil/dto/criar-perfil.dto';
import { PerfilPrisma } from 'src/perfil/perfil.prisma';
import { UsuarioLogado } from 'src/shared/usuario.decorator';

import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Perfil, Usuario } from '@s3curity/core';

@ApiTags('Perfil')
@ApiBearerAuth()
@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilPrisma: PerfilPrisma) {}

  @Post('cadastrarperfil')
  @HttpCode(201)
  @ApiOperation({ summary: 'Cadastrar novo perfil' })
  @ApiBody({ type: CriarPerfilDto })
  @ApiResponse({
    status: 201,
    description: 'Perfil cadastrado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - Token JWT inválido ou ausente',
  })
  async cadastrarPerfil(@Body() dto: CriarPerfilDto): Promise<void> {
    const perfil: Perfil = {
      ...dto,
      dataCriacao: new Date(),
    };
    await this.perfilPrisma.salvar(perfil);
  }

  @Get('hello')
  @ApiOperation({ summary: 'Endpoint de saudação do perfil' })
  @ApiResponse({
    status: 200,
    description: 'Retorna uma saudação personalizada',
    schema: {
      type: 'string',
      example: 'Olá João Silva',
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - Token JWT inválido ou ausente',
  })
  perfil(@UsuarioLogado() usuario: Usuario) {
    return `Olá ${usuario.nomeCompleto}`;
  }
}
