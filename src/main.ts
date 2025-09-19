import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000, '0.0.0.0', () => {
    process.stdout.write('Listening on port 3000...\n');
  });
}

bootstrap();
