import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { RegistrarUsuario, Usuario } from '@s3curity/core';
import { UsuarioPrisma } from './usuario.prisma';

@Controller('auth')
export class AuthController {
  constructor(private readonly repo: UsuarioPrisma) {}

  @Post('login')
  async login() {
    return 'login';
  }

  @Post('registrar')
  async registrar(@Body() usuario: Usuario) {
    const casoDeUso = new RegistrarUsuario(this.repo);
    return await casoDeUso.executar(usuario);
  }
}
