import { NestFactory } from '@nestjs/core';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './core/app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Basic api')
    .setDescription('Basic api microservices description')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app,  swaggerDocument, {
    jsonDocumentUrl: '/openapi.json'
  });

  app.enableCors({
    origin: config.getOrThrow<string>('HTTP_CORS').split(','),
    credentials: true,
  })

  const port = config.getOrThrow<number>('HTTP_PORT');
  const host = config.getOrThrow<string>('HTTP_HOST');

  await app.listen(port);

  logger.log(`Gateaway started: ${host}`); 
  logger.log(`Swagger started: ${host}/docs`); 
}
await bootstrap();
