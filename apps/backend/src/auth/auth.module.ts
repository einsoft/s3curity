import { DbModule } from 'src/db/db.module';

import { Module } from '@nestjs/common';

import { UsuarioPrisma } from '../usuario/usuario.prisma';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { BcryptProvider } from './bcrypt.provider';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [
    UsuarioPrisma,
    BcryptProvider,
    AuthMiddleware,
    RefreshTokenService,
  ],
  exports: [UsuarioPrisma, BcryptProvider, AuthMiddleware, RefreshTokenService],
})
export class AuthModule {}
