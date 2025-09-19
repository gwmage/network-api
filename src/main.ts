import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Starting application...");
  try {
    const app = await NestFactory.create(AppModule);
    console.log("Application created.");
    const port = process.env.PORT || 3000;
await app.listen(port, '0.0.0.0');
    console.log("PORT:", port);
    await app.listen(port, '0.0.0.0');
    console.log('Application listening on port ${port}.');
  } catch (error) {
    console.error("Error starting application:", error);
  }
}
bootstrap();
