import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { PerfilModule } from './perfil/perfil.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PermissaoModule } from './permissao/permissao.module';

@Module({
  imports: [
    AuthModule,
    DbModule,
    UsuarioModule,
    PerfilModule,
    ConfigModule.forRoot(),
    PermissaoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
