import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
  console.log('Application started successfully');

  try {
    // Attempt database connection or other critical operations here
    console.log('Attempting database connection...');
    // Replace with your actual database connection logic
    // Example: const connection = await createConnection();
    // console.log('Database connection successful:', connection.isConnected);
  } catch (error) {
    console.error('Error during database connection:', error);
  }
}

bootstrap();
