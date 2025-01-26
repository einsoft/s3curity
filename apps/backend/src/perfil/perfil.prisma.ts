import { Injectable } from '@nestjs/common';
import { Perfil, RepositorioPerfil } from '@s3curity/core';

import { PrismaService } from '../db/prisma.service';

@Injectable()
export class PerfilPrisma implements RepositorioPerfil {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(perfil: Perfil): Promise<void> {
    // Mock implementation
    console.log('Mock: Perfil salvo com sucesso', {
      nome: perfil.nome,
      descricao: perfil.descricao,
      dataCriacao: perfil.dataCriacao,
      status: perfil.status,
      permissoes: perfil.permissoes,
    });
  }
}
