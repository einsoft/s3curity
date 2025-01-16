import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { AtualizarNomeUsuario, Usuario } from '@s3curity/core';
import { UsuarioLogado } from 'src/shared/usuario.decorator';
import { UsuarioPrisma } from 'src/auth/usuario.prisma';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly repo: UsuarioPrisma,
  ) {}

  @Put(':id/alterarNome')
  @HttpCode(204)
  async alterarNome(
    @Param('id') id: number,
    @Body() alterarNomeDto: { nomeCompleto: string },    
    @UsuarioLogado() usuario: Usuario,
  ){
    const casoDeUso = new AtualizarNomeUsuario(this.repo);

    const nomeCompleto = alterarNomeDto.nomeCompleto;
    return await casoDeUso.executar({ id, nomeCompleto, usuarioLogado: usuario });
  }
}
