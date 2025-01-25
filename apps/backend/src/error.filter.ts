import { Request, Response } from 'express';
import { createLogger, format, transports } from 'winston';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
    };
  }
}

enum ErrorCategory {
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT = 'RATE_LIMIT',
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

interface StandardError {
  code: number;
  category: ErrorCategory;
  type: string;
  message: string;
  timestamp: string;
  path: string;
  details?: Record<string, unknown>;
  stack?: string;
}

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, stack }) => {
          return `${timestamp} ${level}: ${message} ${stack || ''}`;
        }),
      ),
    }),
    new transports.File({
      filename: 'logs/error.log',
      maxsize: 10485760,
      maxFiles: 5,
      tailable: true,
    }),
    new transports.File({
      filename: 'logs/error-json.log',
      format: format.json(),
      maxsize: 10485760,
      maxFiles: 5,
      tailable: true,
    }),
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })],
});

@Catch(Error)
export default class ErrorFilter implements ExceptionFilter {
  private getErrorCategory(status: number): ErrorCategory {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return ErrorCategory.VALIDATION;
      case HttpStatus.UNAUTHORIZED:
        return ErrorCategory.AUTHENTICATION;
      case HttpStatus.FORBIDDEN:
        return ErrorCategory.AUTHORIZATION;
      case HttpStatus.NOT_FOUND:
        return ErrorCategory.NOT_FOUND;
      case HttpStatus.TOO_MANY_REQUESTS:
        return ErrorCategory.RATE_LIMIT;
      default:
        return status >= 500 ? ErrorCategory.INTERNAL : ErrorCategory.EXTERNAL;
    }
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const sanitizedBody = request.body
      ? {
          ...request.body,
          password: request.body.password ? '***' : undefined,
          token: request.body.token ? '***' : undefined,
          refreshToken: request.body.refreshToken ? '***' : undefined,
        }
      : null;

    const errorResponse: StandardError = {
      code: status,
      category: this.getErrorCategory(status),
      type: exception.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception.stack,
        details: {
          method: request.method,
          headers: {
            'user-agent': request.headers['user-agent'],
            'x-forwarded-for': request.headers['x-forwarded-for'],
          },
          body: sanitizedBody,
        },
      }),
    };

    logger.error({
      ...errorResponse,
      user: request.user?.id || 'anonymous',
      environment: process.env.NODE_ENV,
      service: 'backend',
      requestId: request.headers['x-request-id'],
    });

    response.status(status).json({
      success: false,
      error: errorResponse,
    });
  }
}
