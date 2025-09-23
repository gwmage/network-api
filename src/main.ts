import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    console.log('Trying to start the application...');
    console.log('Port before listen:', 3000); 
    await app.listen(3000);
    console.log('Application started successfully on port 3000');
  } catch (error) {
    console.error('Error starting application:', error);
  }
}
bootstrap();
