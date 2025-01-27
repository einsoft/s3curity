import { ApiProperty } from '@nestjs/swagger';

export class PermissaoDto {
  @ApiProperty({ description: 'ID da permissão' })
  id: number;

  @ApiProperty({ description: 'Nome da permissão' })
  nome: string;

  @ApiProperty({ description: 'Descrição da permissão' })
  descricao: string;

  @ApiProperty({ description: 'Data de cadastro da permissão' })
  dataCadastro: Date;

  @ApiProperty({
    description: 'Status da permissão',
    enum: ['ativo', 'inativo'],
  })
  status: 'ativo' | 'inativo';
}
