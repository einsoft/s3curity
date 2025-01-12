import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { AtualizarNomeUsuario } from '@s3curity/core';
import { UsuarioPrisma } from 'src/auth/usuario.prisma';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly repo: UsuarioPrisma,
  ) {}

  @Put(':id/alterarNome')
  @HttpCode(201)
  async alterarNome(
    @Param('id') id: number,
    @Body() alterarNomeDto: { nomeCompleto: string }
  ){
    const casoDeUso = new AtualizarNomeUsuario(this.repo);

    const nomeCompleto = alterarNomeDto.nomeCompleto;
    return await casoDeUso.executar({ id, nomeCompleto });
  }
}
