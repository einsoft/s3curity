/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Perfil, RepositorioPerfil } from '@s3curity/core';

import { PrismaService } from '../db/prisma.service';

@Injectable()
export class PerfilPrisma implements RepositorioPerfil {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(perfil: Perfil): Promise<void> {
    const { permissoes: _, ...perfilData } = perfil;

    await this.prisma.perfil.upsert({
      where: { id: perfil.id ?? -1 },
      update: {
        nome: perfilData.nome,
        descricao: perfilData.descricao,
        status: perfilData.status ?? 'ativo',
      },
      create: {
        nome: perfilData.nome,
        descricao: perfilData.descricao,
        dataCriacao: perfilData.dataCriacao ?? new Date(),
        status: perfilData.status ?? 'ativo',
      },
    });
  }
}
