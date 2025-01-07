import { Body, Controller, Post } from '@nestjs/common';
import { RegistrarUsuario, Usuario } from '@s3curity/core';
import { UsuarioPrisma } from './usuario.prisma';
import { BcryptProvider } from './bcrypt.provider';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly repo: UsuarioPrisma,
    private readonly cripto: BcryptProvider,
  ) {}

  @Post('login')
  async login() {
    return 'login';
  }

  @Post('registrar')
  async registrar(@Body() usuario: Usuario) {
    const casoDeUso = new RegistrarUsuario(this.repo, this.cripto);
    return await casoDeUso.executar(usuario);
  }
}
