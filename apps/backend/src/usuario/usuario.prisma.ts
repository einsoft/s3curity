/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaService } from 'src/db/prisma.service';

import { HttpException, Injectable } from '@nestjs/common';
import { RepositorioUsuario, Usuario } from '@s3curity/core';

@Injectable()
export class UsuarioPrisma implements RepositorioUsuario {
  constructor(private readonly prisma: PrismaService) {}

  async salvar(usuario: Usuario): Promise<void> {
    const { perfis: _, ...usuarioData } = usuario;

    await this.prisma.usuario.upsert({
      where: { id: usuario.id ?? -1 },
      update: {
        nomeCompleto: usuarioData.nomeCompleto,
        email: usuarioData.email,
        senha: usuarioData.senha,
        status: usuarioData.status ?? 'ativo',
        token: usuarioData.token,
        dataExpiracaoToken: usuarioData.dataExpiracaoToken,
        autenticacaoDoisFatoresAtiva:
          usuarioData.autenticacaoDoisFatoresAtiva ?? false,
        telefone: usuarioData.telefone,
        imagemPerfil: usuarioData.imagemPerfil,
        tipoAutenticacao: usuarioData.tipoAutenticacao ?? 'senha',
        dataUltimaAtualizacao: usuarioData.dataUltimaAtualizacao,
        dataUltimoLogin: usuarioData.dataUltimoLogin,
      },
      create: {
        nomeCompleto: usuarioData.nomeCompleto,
        email: usuarioData.email,
        senha: usuarioData.senha ?? '',
        dataCriacao: usuarioData.dataCriacao ?? new Date(),
        status: usuarioData.status ?? 'ativo',
        token: usuarioData.token,
        dataExpiracaoToken: usuarioData.dataExpiracaoToken,
        autenticacaoDoisFatoresAtiva:
          usuarioData.autenticacaoDoisFatoresAtiva ?? false,
        telefone: usuarioData.telefone,
        imagemPerfil: usuarioData.imagemPerfil,
        tipoAutenticacao: usuarioData.tipoAutenticacao ?? 'senha',
        dataUltimaAtualizacao: usuarioData.dataUltimaAtualizacao,
        dataUltimoLogin: usuarioData.dataUltimoLogin,
      },
    });
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
      include: {
        perfis: true,
      },
    });

    if (!usuario) return null;

    return {
      ...usuario,
      status: usuario.status as Usuario['status'],
      tipoAutenticacao: usuario.tipoAutenticacao as Usuario['tipoAutenticacao'],
      perfis: usuario.perfis.map((p) => p.id),
    };
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findFirst({
      where: { id: Number(id) },
      include: {
        perfis: true,
      },
    });

    if (!usuario) return null;

    return {
      ...usuario,
      status: usuario.status as Usuario['status'],
      tipoAutenticacao: usuario.tipoAutenticacao as Usuario['tipoAutenticacao'],
      perfis: usuario.perfis.map((p) => p.id),
    };
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

  async atualizarSenha(id: number, novaSenha: string): Promise<void> {
    const usuarioDB = await this.buscarPorId(id);

    if (!usuarioDB) {
      throw new HttpException('Usuário não encontrado', 400);
    }

    await this.prisma.usuario.update({
      where: { id: Number(usuarioDB.id) },
      data: { senha: novaSenha },
    });
  }

  async updateUsuario(usuarioDB: Usuario, campos: any) {
    await this.prisma.usuario.update({
      where: { id: Number(usuarioDB.id) },
      data: { ...campos },
    });
  }
}
