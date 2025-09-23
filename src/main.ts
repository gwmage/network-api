import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Starting application...");
  const app = await NestFactory.create(AppModule);
  console.log("Application created.");
  await app.listen(3000);
  console.log("Listening on port 3000...");
}
bootstrap();
