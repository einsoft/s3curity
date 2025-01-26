import { AuthMiddleware } from 'src/auth/auth.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';

import { MiddlewareConsumer, Module } from '@nestjs/common';

import { PerfilController } from './perfil.controller';
import { PerfilPrisma } from './perfil.prisma';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [PerfilController],
  providers: [PerfilPrisma],
})
export class PerfilModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PerfilController);
  }
}
