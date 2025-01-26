import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Usuario } from '@s3curity/core';

import { UsuarioLogado } from '../shared/usuario.decorator';
import { PerfilPrisma } from './perfil.prisma';

@ApiTags('Perfil')
@ApiBearerAuth()
@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilPrisma: PerfilPrisma) {}

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
