import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CriarPerfilDto {
  @ApiProperty({
    description: 'Nome do perfil',
    example: 'Administrador',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  nome: string;

  @ApiProperty({
    description: 'Descrição do perfil',
    example: 'Perfil com acesso total ao sistema',
    required: false,
  })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({
    description: 'Status do perfil',
    enum: ['ativo', 'inativo'],
    default: 'ativo',
    required: false,
  })
  @IsEnum(['ativo', 'inativo'])
  @IsOptional()
  status?: 'ativo' | 'inativo' = 'ativo';

  @ApiProperty({
    description: 'IDs das permissões associadas ao perfil',
    type: [Number],
    required: false,
    example: [1, 2, 3],
  })
  @IsArray()
  @IsOptional()
  permissoes?: number[];
}
