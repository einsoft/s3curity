import { HttpException, Injectable } from '@nestjs/common';
import { RepositorioUsuario, Usuario } from '@s3curity/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsuarioPrisma implements RepositorioUsuario {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(usuario: Usuario): Promise<void> {
    await this.prisma.usuario.upsert({
      where: { id: usuario.id ?? -1 },
      update: usuario,
      create: usuario as any,
    });
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findFirst({
      where: { id: Number(id) },
    });
  }

  async atualizarNome(id: number, nomeCompleto: string): Promise<void> {
    const usuarioDB = await this.buscarPorId(id);

    if (!usuarioDB) {
      throw new HttpException('Usuário não encontrado', 400);
    }

    await this.prisma.usuario.update({
      where: { id: Number(usuarioDB.id) },
      data: { nomeCompleto: nomeCompleto },
    });
  }
}
