import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

interface Usuario {
  id?: number;
  nomeCompleto: string;
  email: string;
  senha?: string;
  dataCriacao: Date;
  ativo?: boolean;
  token: string;
  dataExpiracaoToken: Date;
  autenticacaoDoisFatoresAtiva?: boolean;
  telefone?: string;
  imagemPerfil?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('login')
  async login() {
    return 'login';
  }

  @Post('registrar')
  async registrar(@Body() usuario: Usuario) {
    await this.prisma.usuario.create({
      data: {
        nomeCompleto: usuario.nomeCompleto,
        email: usuario.email,
        senha: usuario.senha,
        dataCriacao: new Date(),
        ativo: true,
        token: usuario.token,
        dataExpiracaoToken: new Date(),
        autenticacaoDoisFatoresAtiva: false,
        telefone: usuario.telefone,
        imagemPerfil: usuario.imagemPerfil,
      },
    });
    return 'login';
  }
}
