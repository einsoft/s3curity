import { Body, Controller, Post } from '@nestjs/common';
import { RegistrarUsuario, LoginUsuario } from '@s3curity/core';
import { UsuarioPrisma } from './usuario.prisma';
import { BcryptProvider } from './bcrypt.provider';
import * as jwt from 'jsonwebtoken';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  async registrar(@Body() usuario: RegistrarUsuarioDto) {
    const casoDeUso = new RegistrarUsuario(this.repo, this.cripto);
    return await casoDeUso.executar(usuario);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() dados: LoginDto) {
    const casoDeUso = new LoginUsuario(this.repo, this.cripto);
    const usuario = await casoDeUso.executar({
      email: dados.email,
      senha: dados.senha,
    });

    const segredoToken = process.env.JWT_SECRET;
    return jwt.sign(usuario, segredoToken, { expiresIn: '15d' });
  }
}
