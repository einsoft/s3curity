/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Perfil, RepositorioPerfil } from '@s3curity/core';

import { PrismaService } from '../db/prisma.service';
import { AtualizarPerfilDto } from './dto/atualizar-perfil.dto';

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

  async buscarPorId(id: number): Promise<Perfil | null> {
    const perfil = await this.prisma.perfil.findUnique({
      where: { id },
      include: {
        permissoes: true,
      },
    });

    if (!perfil) {
      return null;
    }

    return {
      ...perfil,
      status: perfil.status as Perfil['status'],
      permissoes: perfil.permissoes.map((p) => p.id),
    };
  }

  async atualizar(id: number, perfil: Perfil): Promise<void> {
    const { id: _, permissoes, ...dadosAtualizacao } = perfil;

    await this.prisma.$transaction(async (tx) => {
      await tx.perfil.update({
        where: { id },
        data: dadosAtualizacao,
      });

      if (permissoes) {
        const permissoesExistentes = await tx.permissao.findMany({
          where: {
            id: { in: permissoes },
          },
          select: { id: true },
        });

        if (permissoesExistentes.length !== permissoes.length) {
          const permissoesInexistentes = permissoes.filter(
            (permissaoId) =>
              !permissoesExistentes.some((p) => p.id === permissaoId),
          );
          throw new Error(
            `Permissões não encontradas: ${permissoesInexistentes.join(', ')}`,
          );
        }

        await tx.perfil.update({
          where: { id },
          data: {
            permissoes: {
              set: [],
              connect: permissoesExistentes.map(({ id }) => ({ id })),
            },
          },
        });
      }
    });
  }

  async excluir(id: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const perfil = await tx.perfil.findUnique({
        where: { id },
        include: { permissoes: true },
      });

      if (!perfil) {
        throw new Error('Perfil não encontrado');
      }

      // Remove associações de permissões
      await tx.perfil.update({
        where: { id },
        data: {
          permissoes: {
            set: [],
          },
        },
      });

      // Deleta o perfil
      await tx.perfil.delete({
        where: { id },
      });
    });
  }
}
