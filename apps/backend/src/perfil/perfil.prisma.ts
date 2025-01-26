/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Perfil, RepositorioPerfil } from '@s3curity/core';

import { PrismaService } from '../db/prisma.service';

@Injectable()
export class PerfilPrisma implements RepositorioPerfil {
  constructor(private readonly prisma: PrismaService) {}

  async listar(limite: number, offset: number): Promise<Perfil[]> {
    const perfis = await this.prisma.perfil.findMany({
      take: limite,
      skip: offset,
      include: {
        permissoes: true,
      },
      orderBy: {
        dataCriacao: 'desc',
      },
    });

    return perfis.map((perfil) => ({
      ...perfil,
      status: perfil.status as Perfil['status'],
      permissoes: perfil.permissoes.map((p) => p.id),
    }));
  }

  async salvar(perfil: Perfil): Promise<void> {
    const { permissoes, ...perfilData } = perfil;

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
