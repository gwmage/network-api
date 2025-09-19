import { NestFactory } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Starting application...");
  try {
    const app = await NestFactory.create(AppModule);
    console.log("Application created.");
    const port = process.env.PORT || 3000; // Use port from environment variables if available 
    await app.listen(port);
    console.log('Application listening on port ${port}.');
  } catch (error) {
    console.error("Error starting application:", error);
  }
}
bootstrap();

async function bootstrap() {
  console.log("Starting application...");
  try {
    const app = await NestFactory.create(AppModule);
    console.log("Application created.");
    await app.listen(3000);
    console.log("Application listening on port 3000.");
  } catch (error) {
    console.error("Error starting application:", error);
  }
}
bootstrap();
