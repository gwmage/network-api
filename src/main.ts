import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting NestJS application...');

  try {
    const app = await NestFactory.create(AppModule);
    console.log('NestJS application created.');
    await app.listen(3000);
    console.log('NestJS application listening on port 3000.');
  } catch (error) {
    console.error('Error starting NestJS application:', error);
  }
}

bootstrap();
