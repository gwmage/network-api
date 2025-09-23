import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  console.log("Starting application...");

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  console.log("Application created...");

  const config = new DocumentBuilder()
    .setTitle('Proximo')
    .setDescription('The Proximo API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  console.log("Swagger setup complete...");

  await app.listen(3000);

  console.log("Application listening on port 3000...");
}

bootstrap();
