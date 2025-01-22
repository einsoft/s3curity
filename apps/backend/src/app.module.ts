import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PerfilModule } from './perfil/perfil.module';

@Module({
  imports: [AuthModule, DbModule, UsuarioModule, PerfilModule],
  controllers: [AppController],
})
export class AppModule {}
