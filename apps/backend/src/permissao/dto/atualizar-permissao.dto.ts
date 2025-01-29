import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { CriarPermissaoDto } from './criar-permissao.dto';

export class AtualizarPermissaoDto extends PartialType(CriarPermissaoDto) {
  @ApiProperty({ description: 'ID da permissão' })
  id: number;

  @ApiProperty({ description: 'Nome da permissão' })
  nome: string;

  @ApiProperty({ description: 'Descrição da permissão' })
  descricao?: string;

  @ApiProperty({ description: 'Data de cadastro da permissão' })
  dataCadastro: Date;

  @ApiProperty({
    description: 'Status da permissão',
    enum: ['ativo', 'inativo'],
  })
  status?: 'ativo' | 'inativo';
}
