import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: true, // Adjust this for production
    credentials: true,
  });
  app.use(cookieParser());
  const port = process.env.PORT || 3000;

  const dataSource = app.get(DataSource);
  const connectionString = process.env.TYPEORM_CONNECTION;

  if (!connectionString) {
    console.error("TYPEORM_CONNECTION environment variable not set. Exiting...");
    process.exit(1);
  }

  const maxRetries = 10;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await dataSource.initialize();
      console.log("Database connection successful!");
      break; // Exit the loop if the connection is successful
    } catch (error) {
      console.error(`Failed to connect to database (Attempt ${retries + 1}/${maxRetries}):`, error);
      retries++;
      if (retries === maxRetries) {
        console.error(`Failed to connect to database after ${maxRetries} attempts. Exiting...`);
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
    }
  }

  try {
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error(`Failed to start application on port ${port}. Exiting...`);
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
