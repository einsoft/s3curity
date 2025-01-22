import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [AuthModule],
  controllers: [UsuarioController],
})
export class UsuarioModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsuarioController);
  }
}
