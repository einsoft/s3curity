import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUsuario, RegistrarUsuario } from '@s3curity/core';

import { UsuarioPrisma } from '../usuario/usuario.prisma';
import { BcryptProvider } from './bcrypt.provider';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto, TokenResponseDto } from './dto/refresh-token.dto';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { RefreshTokenService } from './refresh-token.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Get('csrf-token')
  @ApiOperation({ summary: 'Get CSRF token' })
  @ApiResponse({ status: 200, description: 'CSRF token generated successfully' })
  @ApiResponse({ status: 500, description: 'Error generating CSRF token' })
  async getCsrfToken(@Req() req: Request, @Res() res: Response) {
    try {
      const csrfToken = req.csrfToken();
      console.log('Generated CSRF Token:', csrfToken);
      res.json({ token: csrfToken });
    } catch (error) {
      console.error('CSRF Token Generation Error:', error.message);
      throw new HttpException(
        `Error generating CSRF token: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  constructor(
    private readonly repo: UsuarioPrisma,
    private readonly cripto: BcryptProvider,
    private readonly refreshTokenService: RefreshTokenService,
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
  async login(@Body() dados: LoginDto, @Req() req: Request) {
    try {
      const casoDeUso = new LoginUsuario(this.repo, this.cripto);
      const usuarioResult = await casoDeUso.executar({
        email: dados.email,
        senha: dados.senha,
      });

      if (!usuarioResult) {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const usuario = usuarioResult;

      const segredoToken = process.env.JWT_SECRET;
      if (!segredoToken) {
        throw new HttpException(
          'JWT_SECRET não configurado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const token = jwt.sign(usuario, segredoToken, { expiresIn: '1h' });
      const refreshToken = await this.refreshTokenService.createRefreshToken(
        usuario.id,
        req,
      );

      return {
        token,
        refreshToken,
      };
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

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Req() req: Request,
  ): Promise<TokenResponseDto> {
    try {
      const newRefreshToken = await this.refreshTokenService.rotateRefreshToken(
        refreshTokenDto.refreshToken,
        req,
      );

      if (!newRefreshToken) {
        throw new HttpException(
          'Invalid refresh token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const refreshTokenData =
        await this.refreshTokenService.validateRefreshToken(newRefreshToken);

      if (!refreshTokenData) {
        throw new HttpException(
          'Invalid refresh token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const segredoToken = process.env.JWT_SECRET;
      if (!segredoToken) {
        throw new HttpException(
          'JWT_SECRET não configurado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const token = jwt.sign(refreshTokenData.usuario, segredoToken, {
        expiresIn: '1h',
      });

      return {
        token,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error refreshing token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
