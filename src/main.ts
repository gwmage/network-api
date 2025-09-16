import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifySwagger);
  await app.register(fastifySwaggerUi);
  app.useGlobalPipes(new ValidationPipe());

  const port = parseInt(process.env.PORT, 10) || 3000;

  await app.listen(port, '0.0.0.0');
  console.log('Application is running on: ${await app.getUrl()}');
}
bootstrap();