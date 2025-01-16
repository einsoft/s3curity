import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [AuthModule, DbModule, UsuarioModule],
  controllers: [AppController],
})
export class AppModule {}
