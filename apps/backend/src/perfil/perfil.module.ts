import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PerfilController } from './perfil.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [AuthModule],
  controllers: [PerfilController],
})
export class PerfilModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PerfilController);
  }
}
