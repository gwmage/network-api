import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    console.log("Starting application...");
    await app.listen(3000);
    console.log("Application started on port 3000");
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1);
  }
}

bootstrap();
