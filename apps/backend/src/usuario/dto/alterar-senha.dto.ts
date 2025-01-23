import { ApiProperty } from '@nestjs/swagger';

export class AlterarSenhaDto {
  @ApiProperty({
    description: 'Senha atual do usuário',
    example: 'senhaAtual123',
  })
  senhaAtual: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'novaSenha123',
  })
  novaSenha: string;

  @ApiProperty({
    description: 'Confirmação da nova senha do usuário',
    example: 'novaSenha123',
  })
  confirmaNovaSenha: string;
}
