import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { CsrfMiddleware } from './auth/csrf.middleware';
import errorFilter from './error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Configure CORS with specific origin and credentials
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-XSRF-Token'],
    exposedHeaders: ['X-CSRF-Token', 'X-XSRF-Token'],
  });

  // Apply CSRF middleware globally
  const csrfMiddleware = app.get(CsrfMiddleware);
  app.use(csrfMiddleware.use.bind(csrfMiddleware));

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('S3curity')
    .setDescription('Documentação API S3curity.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new errorFilter());
  const port = process.env.PORT ?? 4000;

  await app.listen(port);
}

bootstrap();
