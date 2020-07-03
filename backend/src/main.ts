import "regenerator-runtime/runtime";

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(PORT as string || 5020);
}
bootstrap();
