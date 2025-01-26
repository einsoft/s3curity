import { ApiProperty } from '@nestjs/swagger';

export class PerfilDto {
  @ApiProperty({ example: 1, description: 'ID do perfil' })
  id?: number;

  @ApiProperty({ example: 'Admin', description: 'Nome do perfil' })
  nome: string;

  @ApiProperty({
    example: 'Perfil administrativo',
    description: 'Descrição do perfil',
    required: false,
  })
  descricao?: string;

  @ApiProperty({
    example: '2024-01-26T15:00:00.000Z',
    description: 'Data de criação do perfil',
  })
  dataCriacao: Date;

  @ApiProperty({
    example: 'ativo',
    description: 'Status do perfil',
    enum: ['ativo', 'inativo'],
    required: false,
  })
  status?: 'ativo' | 'inativo';

  @ApiProperty({
    example: [1, 2, 3],
    description: 'IDs das permissões associadas',
    type: [Number],
    required: false,
  })
  permissoes?: number[];
}
