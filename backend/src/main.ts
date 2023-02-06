import 'regenerator-runtime/runtime';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const enableCors = configService.get<boolean>('ENABLE_CORS');
  if (enableCors) {
    app.enableCors();
    logger.log(`CORS is enabled for all origins`);
  } else {
    logger.warn(`CORS is disabled`);
  }

  const port = configService.get<number>('PORT');
  await app.listen(port);
  logger.log(`Server is running on ${await app.getUrl()}`);
}

bootstrap().catch(console.log);
