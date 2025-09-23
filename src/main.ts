import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Bootstrapping application...");
  const app = await NestFactory.create(AppModule);
  console.log("Application bootstrapped.");
  await app.listen(3000);
console.log("Application started. Listening on port 3000.");
  console.log("Application listening on port 3000.");
}
bootstrap();
