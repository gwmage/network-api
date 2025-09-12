import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:4200', 'https://your-frontend-domain.com'], // Replace with your frontend URLs
    credentials: true,
  });
  app.use(cookieParser());
  const port = parseInt(process.env.PORT, 10) || 3000; 

  try {
    await app.listen(port, '0.0.0.0'); // Explicitly listen on all interfaces and the designated port
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error(`Failed to start application on port ${port}. Exiting...`);
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
