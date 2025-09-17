import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Starting application...");
  try {
    const app = await NestFactory.create(AppModule);
    console.log("Application created...");
    await app.listen(3000);
    console.log("Listening on port 3000...");
  } catch (error) {
    console.error("Error starting application:", error);
  }
}

bootstrap();
