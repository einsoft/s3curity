import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { Usuario } from '@s3curity/core';
import { UsuarioRepositorio } from './usuario.repositorio';

@Controller('auth')
export class AuthController {
  constructor(private readonly repo: UsuarioRepositorio) {}

  @Post('login')
  async login() {
    return 'login';
  }

  @Post('registrar')
  async registrar(@Body() usuario: Usuario) {
    const usuarioExistente = await this.repo.buscarPorEmail(usuario.email);

    if (usuarioExistente) {
      throw new HttpException('Usuário já existe', 400);
    }

    await this.repo.salvar(usuario);
    return 'Salvo com sucesso';
  }
}
