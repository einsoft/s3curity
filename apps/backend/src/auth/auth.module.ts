import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { UsuarioPrisma } from './usuario.prisma';
import { BcryptProvider } from './bcrypt.provider';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [UsuarioPrisma, BcryptProvider, AuthMiddleware],
  exports: [UsuarioPrisma, AuthMiddleware]
})
export class AuthModule {}
