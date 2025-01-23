import { ApiProperty } from '@nestjs/swagger';

export class RegistrarUsuarioDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  nomeCompleto: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  senha: string;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2023-01-01T00:00:00.000Z',
  })
  dataCriacao: Date;

  @ApiProperty({
    description: 'Token de autenticação do usuário',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;

  @ApiProperty({
    description: 'Data de expiração do token de autenticação',
    example: '2023-01-02T00:00:00.000Z',
  })
  dataExpiracaoToken: Date;
}
