import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { UsuarioPrisma } from './usuario.prisma';
import { BcryptProvider } from './bcrypt.provider';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [UsuarioPrisma, BcryptProvider],
  exports: [UsuarioPrisma]
})
export class AuthModule {}
