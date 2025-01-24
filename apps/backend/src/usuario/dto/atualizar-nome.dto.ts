import { ApiProperty } from '@nestjs/swagger';

export class AtualizarNomeDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João da Silva',
  })
  nomeCompleto: string;
}
