/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Permissao, RepositorioPermissao } from '@s3curity/core';

import { PrismaService } from '../db/prisma.service';

@Injectable()
export class PermissaoPrisma implements RepositorioPermissao {
  constructor(private readonly prisma: PrismaService) {}

  async listar(limite: number, offset: number): Promise<Permissao[]> {
    const permissoes = await this.prisma.permissao.findMany({
      take: limite,
      skip: offset,
      orderBy: {
        dataCadastro: 'desc',
      },
    });

    return permissoes.map((permissao) => ({
      ...permissao,
      status: permissao.status as Permissao['status'],
    }));
  }

  async salvar(permissao: Permissao): Promise<void> {
    await this.prisma.permissao.upsert({
      where: { id: permissao.id ?? -1 },
      update: {
        nome: permissao.nome,
        descricao: permissao.descricao,
        status: permissao.status ?? 'ativo',
      },
      create: {
        nome: permissao.nome,
        descricao: permissao.descricao,
        dataCadastro: permissao.dataCadastro ?? new Date(),
        status: permissao.status ?? 'ativo',
      },
    });
  }

  async buscarPorId(id: number): Promise<Permissao | null> {
    const permissao = await this.prisma.permissao.findUnique({
      where: { id },
    });

    if (!permissao) {
      return null;
    }

    return {
      ...permissao,
      status: permissao.status as Permissao['status'],
    };
  }

  async atualizar(id: number, permissao: Permissao): Promise<void> {
    const { id: _, ...dadosAtualizacao } = permissao;

    await this.prisma.permissao.update({
      where: { id },
      data: dadosAtualizacao,
    });
  }

  async excluir(id: number): Promise<void> {
    const permissao = await this.prisma.permissao.findUnique({
      where: { id },
    });

    if (!permissao) {
      throw new Error('Permissão não encontrada');
    }

    await this.prisma.permissao.delete({
      where: { id },
    });
  }
}
