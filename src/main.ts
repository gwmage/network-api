import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    console.log("Bootstrap function starting...");
    console.log("Environment variables:", process.env);
    const app = await NestFactory.create(AppModule);
    console.log("AppModule created.");
    app.useLogger(new Logger());
    const port = process.env.PORT || 3000;
    console.log("PORT:", port);
    await app.listen(port, '0.0.0.0');
    console.log('Application listening on port ${port}.');
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1); 
  }
}
bootstrap();
