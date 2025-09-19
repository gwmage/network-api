import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    console.error("Bootstrap function starting...");
    console.error("Environment variables:", process.env);
    const app = await NestFactory.create(AppModule);
    console.error("AppModule created.");
    app.useLogger(new Logger());
    const port = process.env.PORT || 3000;
    console.error("PORT:", port);
    await app.listen(port, '0.0.0.0');
    console.error('Application listening on port ${port}.");
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1); 
  }
}
bootstrap();
