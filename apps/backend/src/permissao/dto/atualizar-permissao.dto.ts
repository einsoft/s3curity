import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { CriarPermissaoDto } from './criar-permissao.dto';

export class AtualizarPermissaoDto extends PartialType(CriarPermissaoDto) {
  @ApiProperty({ description: 'ID da permissão' })
  id: number;

  @ApiProperty({
    description: 'Status da permissão',
    enum: ['ativo', 'inativo'],
  })
  status?: 'ativo' | 'inativo';
}
