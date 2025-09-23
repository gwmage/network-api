import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Starting application...");
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  console.log("Application created.");

  await app.listen(3000);
  console.log("Application listening on port 3000.");
  console.log('Starting application...');
  try {
    const app = await NestFactory.create(AppModule);
    const port = 3000;
await app.listen(port);
console.log('Listening at http://localhost:${port}');
    console.log('Application listening on port 3000');
  } catch (error) {
    console.error('Error starting application:', error);
  }
}

bootstrap();
