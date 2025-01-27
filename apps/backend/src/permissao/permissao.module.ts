import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';

import { MiddlewareConsumer, Module } from '@nestjs/common';
import {
  AtualizarPermissao,
  CadastrarPermissao,
  ExcluirPermissao,
  ListarPermissoes,
} from '@s3curity/core';

import { PermissaoController } from './permissao.controller';
import { PermissaoPrisma } from './permissao.prisma';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [PermissaoController],
  providers: [
    PermissaoPrisma,
    {
      provide: ListarPermissoes,
      useFactory: (repo: PermissaoPrisma) => new ListarPermissoes(repo),
      inject: [PermissaoPrisma],
    },
    CadastrarPermissao,
    AtualizarPermissao,
    ExcluirPermissao,
  ],
})
export class PermissaoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PermissaoController);
  }
}
