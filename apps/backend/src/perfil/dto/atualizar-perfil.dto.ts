import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AtualizarPerfilDto {
  @ApiProperty({ type: Number, description: 'The ID of the profile' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    description: 'The name of the profile',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nome?: string;

  @ApiProperty({
    type: String,
    description: 'The description of the profile',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  descricao?: string;

  @ApiProperty({
    type: String,
    description: 'The status of the profile',
    required: false,
    enum: ['ativo', 'inativo'],
  })
  @IsOptional()
  @IsString()
  status?: 'ativo' | 'inativo';

  @ApiProperty({
    type: [Number],
    description: 'The permissions of the profile',
    required: false,
  })
  @IsOptional()
  permissoes?: number[];
}
