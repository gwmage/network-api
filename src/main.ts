import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Starting application...");
  const app = await NestFactory.create(AppModule);
  console.log("Application started.");
  await app.listen(3000);
}
bootstrap();