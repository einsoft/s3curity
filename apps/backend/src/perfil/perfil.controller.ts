import { Controller, Get } from '@nestjs/common';
import { Usuario } from '@s3curity/core';
import { UsuarioLogado } from 'src/shared/usuario.decorator';

@Controller('perfil')
export class PerfilController {
  @Get()
  perfil(@UsuarioLogado() usuario: Usuario) {
    return `Olá ${usuario.nomeCompleto}`;
  }
}
