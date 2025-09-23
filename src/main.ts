import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.listen(3000);

  // Added readiness check
  setTimeout(() => {
    console.log("Application ready");
  }, 5000); // Wait for 5 seconds
}

bootstrap();
