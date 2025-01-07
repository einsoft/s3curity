import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { UsuarioPrisma } from './usuario.prisma';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [UsuarioPrisma],
})
export class AuthModule {}
