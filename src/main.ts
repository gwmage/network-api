import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('Starting application bootstrap...');
    const app = await NestFactory.create(AppModule);
    console.log('Application instance created.');
    await app.listen(3000);
    console.log('Application listening on port 3000.');
  } catch (error) {
    console.error('Error during application bootstrap:', error);
  }
}

bootstrap();
