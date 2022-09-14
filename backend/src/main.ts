import 'regenerator-runtime/runtime';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootsrap');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const enableCors = configService.get<boolean>('ENABLE_CORS');
  if (enableCors) {
    const corsHosts = configService.get<string>('CORS_HOSTS').split(';');
    app.enableCors({
      origin: corsHosts,
    });
    logger.log(`CORS is enabled for hosts: ${corsHosts}`);
  } else {
    logger.warn(`CORS is disabled`);
  }

  const port = configService.get<number>('PORT');
  await app.listen(port);
  logger.log(`Server is running on ${await app.getUrl()}`);
}

bootstrap().catch(console.log);
