import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log("Starting bootstrap...");
    const app = await NestFactory.create(AppModule);
    console.log("NestFactory created...");

    await app.listen(3000, '0.0.0.0', () => {
      console.log('Listening on port 3000...');
    });
    console.log("App listening...");
  } catch (error) {
    console.error("Error during bootstrap:", error);
  }
}

bootstrap();
