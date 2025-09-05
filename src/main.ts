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
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000; // Fallback to 3000 if PORT isn't set

  try {
    await app.listen(port);
  } catch (error) {
    console.error(`Failed to start application on port ${port}. Exiting...`);
    console.error(error);
    process.exit(1);
  }

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
