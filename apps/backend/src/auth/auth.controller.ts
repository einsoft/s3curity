import * as jwt from 'jsonwebtoken';

import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUsuario, RegistrarUsuario } from '@s3curity/core';

import { UsuarioPrisma } from '../usuario/usuario.prisma';
import { BcryptProvider } from './bcrypt.provider';
import { LoginDto } from './dto/login.dto';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly repo: UsuarioPrisma,
    private readonly cripto: BcryptProvider,
  ) {}

  @Post('registrar')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Usuário já existe' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async registrar(@Body() usuario: RegistrarUsuarioDto) {
    try {
      const casoDeUso = new RegistrarUsuario(this.repo, this.cripto);
      const resultado = await casoDeUso.executar(usuario);
      return resultado;
    } catch (error) {
      if (error.message === 'Usuário já existe') {
        throw new HttpException(
          'Já existe um usuário com este email',
          HttpStatus.CONFLICT,
        );
      }
      if (error.message === 'Dados inválidos') {
        throw new HttpException(
          'Dados de registro inválidos',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        error.message || 'Erro ao registrar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async login(@Body() dados: LoginDto) {
    try {
      const casoDeUso = new LoginUsuario(this.repo, this.cripto);
      const usuario = await casoDeUso.executar({
        email: dados.email,
        senha: dados.senha,
      });

      const segredoToken = process.env.JWT_SECRET;
      if (!segredoToken) {
        throw new HttpException(
          'JWT_SECRET não configurado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const token = jwt.sign(usuario, segredoToken, { expiresIn: '15d' });
      return { token };
    } catch (error) {
      if (error.message === 'Credenciais inválidas') {
        throw new HttpException(
          'Usuário ou senha incorretos',
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        error.message || 'Erro interno do servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
