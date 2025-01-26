import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AuthMiddleware } from '../auth/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { DbModule } from '../db/db.module';
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
