import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { UsuarioPrisma } from '../usuario/usuario.prisma';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { BcryptProvider } from './bcrypt.provider';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [UsuarioPrisma, BcryptProvider, AuthMiddleware],
  exports: [UsuarioPrisma, BcryptProvider, AuthMiddleware],
})
export class AuthModule {}
