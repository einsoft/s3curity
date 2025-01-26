import { CriarPerfilDto } from 'src/perfil/dto/criar-perfil.dto';
import { PerfilDto } from 'src/perfil/dto/perfil.dto';
import { PerfilPrisma } from 'src/perfil/perfil.prisma';
import { UsuarioLogado } from 'src/shared/usuario.decorator';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ListarPerfis, Perfil, Usuario } from '@s3curity/core';

import { AtualizarPerfilDto } from './dto/atualizar-perfil.dto';

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

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar um perfil existente' })
  @ApiBody({ type: AtualizarPerfilDto })
  @ApiResponse({
    status: 200,
    description: 'Perfil atualizado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - Token JWT inválido ou ausente',
  })
  @ApiResponse({
    status: 404,
    description: 'Perfil não encontrado',
  })
  @ApiResponse({
    status: 422,
    description: 'Permissões inválidas ou não encontradas',
  })
  async atualizarPerfil(
    @Param('id') id: string,
    @Body() dto: AtualizarPerfilDto,
  ): Promise<void> {
    try {
      if (!dto.nome) {
        throw new HttpException('Nome é obrigatório', HttpStatus.BAD_REQUEST);
      }

      const perfil: Perfil = {
        id: Number(id),
        nome: dto.nome,
        descricao: dto.descricao || '',
        status: dto.status || 'ativo',
        permissoes: dto.permissoes || [],
        dataCriacao: new Date(),
      };
      await this.perfilPrisma.atualizar(Number(id), perfil);
    } catch (error) {
      if (error.message.includes('Permissões não encontradas')) {
        throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir um perfil existente' })
  @ApiResponse({
    status: 204,
    description: 'Perfil excluído com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - Token JWT inválido ou ausente',
  })
  @ApiResponse({
    status: 404,
    description: 'Perfil não encontrado',
  })
  async excluirPerfil(@Param('id') id: string): Promise<void> {
    try {
      await this.perfilPrisma.excluir(Number(id));
    } catch (error) {
      if (error.message.includes('Perfil não encontrado')) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }
}
