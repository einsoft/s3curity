import { Body, Controller, Post } from '@nestjs/common';
import { RegistrarUsuario, Usuario, LoginUsuario } from '@s3curity/core';
import { UsuarioPrisma } from './usuario.prisma';
import { BcryptProvider } from './bcrypt.provider';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly repo: UsuarioPrisma,
    private readonly cripto: BcryptProvider,
  ) {}

  @Post('registrar')
  async registrar(@Body() usuario: Usuario) {
    const casoDeUso = new RegistrarUsuario(this.repo, this.cripto);
    return await casoDeUso.executar(usuario);
  }

  @Post('login')
  async login(@Body() dados: { email: string; senha: string }) {
    const casoDeUso = new LoginUsuario(this.repo, this.cripto);
    const usuario = await casoDeUso.executar({
      email: dados.email,
      senha: dados.senha,
    });

    const segredoToken = process.env.JWT_SECRET;
    return jwt.sign(usuario, segredoToken, { expiresIn: '15d' });
  }
}
