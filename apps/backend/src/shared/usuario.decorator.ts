import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const UsuarioLogado = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.usuario;
});

export { UsuarioLogado };
