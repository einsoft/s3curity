import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export type StatusUsuario = 'ativo' | 'inativo' | 'pendente';
export type TipoAutenticacao = 'senha' | 'google' | 'facebook' | 'github';

export class RegistrarUsuarioDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  @IsNotEmpty({ message: 'O nome completo é obrigatório' })
  nomeCompleto: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@example.com',
  })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail(
    {
      allow_ip_domain: false,
      allow_utf8_local_part: true,
      require_tld: true,
    },
    { message: 'O email é inválido' },
  )
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  senha: string;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2023-01-01T00:00:00.000Z',
  })
  dataCriacao: Date;

  @ApiProperty({
    description: 'Status do usuário',
    example: 'ativo',
    enum: ['ativo', 'inativo', 'pendente'],
    required: false,
    default: 'ativo',
  })
  @IsOptional()
  @IsEnum(['ativo', 'inativo', 'pendente'] as const)
  status?: StatusUsuario;

  @ApiProperty({
    description: 'Tipo de autenticação',
    example: 'senha',
    enum: ['senha', 'google', 'facebook', 'github'],
    required: false,
    default: 'senha',
  })
  @IsOptional()
  @IsEnum(['senha', 'google', 'facebook', 'github'] as const)
  tipoAutenticacao?: TipoAutenticacao;
}
