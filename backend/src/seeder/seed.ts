import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { Seeder } from './seeder';


async function bootstrap() {
    const app = await NestFactory.createApplicationContext(SeederModule);
    const seeder = app.get(Seeder);

    await seeder.seed();
    await app.close();
}
bootstrap();
