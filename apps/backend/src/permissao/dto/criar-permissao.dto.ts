import { ApiProperty } from '@nestjs/swagger';

export class CriarPermissaoDto {
  @ApiProperty({ description: 'Nome da permissão' })
  nome: string;

  @ApiProperty({ description: 'Descrição da permissão', required: false })
  descricao?: string;

  @ApiProperty({ description: 'Status da permissão', default: 'ativo' })
  status?: string;
}
