import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
