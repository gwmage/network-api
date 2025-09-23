import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting application bootstrap...');
  try {
    const app = await NestFactory.create(AppModule);
    console.log('NestFactory created...');
    await app.listen(3000);
    console.log('App listening on port 3000...');
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
}

bootstrap();
