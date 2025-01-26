import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import {
  HttpException,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Usuario } from '@s3curity/core';

import { UsuarioPrisma } from '../usuario/usuario.prisma';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly repo: UsuarioPrisma) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new HttpException(
          'Autenticação necessária. Por favor, forneça um token válido.',
          401,
        );
      }

      const token = authHeader.split(' ')[1];

      if (!process.env.JWT_SECRET) {
        this.logger.error('JWT_SECRET não está configurado');
        throw new HttpException('Erro de configuração do servidor', 500);
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
        ignoreExpiration: false,
      }) as Usuario;

      if (!payload?.email) {
        throw new HttpException('Token inválido ou expirado', 401);
      }

      const usuario = await this.repo.buscarPorEmail(payload.email);

      if (!usuario) {
        throw new HttpException('Usuário não encontrado ou inativo', 401);
      }

      if (usuario.senha) {
        delete usuario.senha;
      }

      req.usuario = usuario;
      next();
    } catch (error) {
      this.logger.error(`Erro de autenticação: ${error.message}`);

      if (error instanceof jwt.TokenExpiredError) {
        throw new HttpException(
          'Sessão expirada. Por favor, faça login novamente.',
          401,
        );
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new HttpException('Token inválido ou malformado', 401);
      }

      throw new HttpException(
        error.message || 'Erro de autenticação',
        error.status || 401,
      );
    }
  }
}
