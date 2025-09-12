import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true, // Adjust this for production
    credentials: true,
  });
  app.use(cookieParser());
  const port = parseInt(process.env.PORT) || 3000; // Use PORT env variable provided by Railway, or 3000 for local development. Parse to integer.

  try {
    const server = await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
    server.on('error', (error) => {
      console.error('Server error:', error);
    });
  } catch (error) {
    console.error(`Failed to start application on port ${port}. Exiting...`);
    console.error(error);
    process.exit(1);
  }
}

bootstrap();