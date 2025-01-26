import { CriarPerfilDto } from 'src/perfil/dto/criar-perfil.dto';
import { PerfilDto } from 'src/perfil/dto/perfil.dto';
import { PerfilPrisma } from 'src/perfil/perfil.prisma';
import { UsuarioLogado } from 'src/shared/usuario.decorator';

import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListarPerfis, Perfil, Usuario } from '@s3curity/core';

@ApiTags('Perfil')
@ApiBearerAuth()
@Controller('perfil')
export class PerfilController {
  constructor(
    private readonly perfilPrisma: PerfilPrisma,
    private readonly listarPerfisService: ListarPerfis,
  ) {}

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

  @Get('listar')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar perfis' })
  @ApiQuery({
    name: 'limite',
    type: Number,
    required: false,
    description: 'Número máximo de perfis a retornar',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Número de perfis a pular',
    example: 0,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de perfis retornada com sucesso',
    type: [PerfilDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - Token JWT inválido ou ausente',
  })
  async listarPerfis(
    @Query('limite') limite: string = '10',
    @Query('offset') offset: string = '0',
  ): Promise<Perfil[]> {
    return await this.listarPerfisService.executar({
      limite: parseInt(limite),
      offset: parseInt(offset),
    });
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
