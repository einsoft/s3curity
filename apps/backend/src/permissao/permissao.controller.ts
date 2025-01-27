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
import { ListarPermissoes, Permissao, Usuario } from '@s3curity/core';

import { UsuarioLogado } from '../shared/usuario.decorator';
import { AtualizarPermissaoDto } from './dto/atualizar-permissao.dto';
import { CriarPermissaoDto } from './dto/criar-permissao.dto';
import { PermissaoDto } from './dto/permissao.dto';
import { PermissaoPrisma } from './permissao.prisma';

@ApiTags('Permissao')
@ApiBearerAuth()
@Controller('permissao')
export class PermissaoController {
  constructor(
    private readonly permissaoPrisma: PermissaoPrisma,
    private readonly listarPermissoesService: ListarPermissoes,
  ) {}

  @Post('cadastrarpermissao')
  @HttpCode(201)
  @ApiOperation({ summary: 'Cadastrar nova permissão' })
  @ApiBody({ type: CriarPermissaoDto })
  @ApiResponse({
    status: 201,
    description: 'Permissão cadastrada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - Token JWT inválido ou ausente',
  })
  async cadastrarPermissao(@Body() dto: CriarPermissaoDto): Promise<void> {
    const permissao: Permissao = {
      ...dto,
      dataCadastro: new Date(),
      status: 'ativo',
    };
    await this.permissaoPrisma.salvar(permissao);
  }

  @Get('listar')
  @HttpCode(200)
  @ApiOperation({ summary: 'Listar permissões' })
  @ApiQuery({
    name: 'limite',
    type: Number,
    required: false,
    description: 'Número máximo de permissões a retornar',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Número de permissões a pular',
    example: 0,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de permissões retornada com sucesso',
    type: [PermissaoDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - Token JWT inválido ou ausente',
  })
  async listarPermissoes(
    @Query('limite') limite: string = '10',
    @Query('offset') offset: string = '0',
  ): Promise<Permissao[]> {
    return await this.listarPermissoesService.executar({
      limite: parseInt(limite),
      offset: parseInt(offset),
    });
  }

  @Get('hello')
  @ApiOperation({ summary: 'Endpoint de saudação da permissão' })
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
  permissao(@UsuarioLogado() usuario: Usuario) {
    return `Olá ${usuario.nomeCompleto}`;
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Atualizar uma permissão existente' })
  @ApiBody({ type: AtualizarPermissaoDto })
  @ApiResponse({
    status: 200,
    description: 'Permissão atualizada com sucesso',
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
    description: 'Permissão não encontrada',
  })
  async atualizarPermissao(
    @Param('id') id: string,
    @Body() dto: AtualizarPermissaoDto,
  ): Promise<void> {
    try {
      if (!dto.nome) {
        throw new HttpException('Nome é obrigatório', HttpStatus.BAD_REQUEST);
      }

      const permissao: Permissao = {
        id: Number(id),
        nome: dto.nome,
        descricao: dto.descricao || '',
        status: (dto.status || 'ativo') as 'ativo' | 'inativo',
        dataCadastro: new Date(),
      };
      await this.permissaoPrisma.atualizar(Number(id), permissao);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir uma permissão existente' })
  @ApiResponse({
    status: 204,
    description: 'Permissão excluída com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - Token JWT inválido ou ausente',
  })
  @ApiResponse({
    status: 404,
    description: 'Permissão não encontrada',
  })
  async excluirPermissao(@Param('id') id: string): Promise<void> {
    try {
      await this.permissaoPrisma.excluir(Number(id));
    } catch (error) {
      if (error.message.includes('Permissão não encontrada')) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }
}
