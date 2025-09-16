import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  console.log("Starting bootstrap...");
  try {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    console.log("App created...");
    const config = new DocumentBuilder()
      .setTitle('My App')
      .setDescription('My App API description')
      .setVersion('1.0')
      .build();

    console.log("Swagger config built...");

    const document = SwaggerModule.createDocument(app, config);

    console.log("Swagger document created...");

    fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
    SwaggerModule.setup('api', app, document);

    console.log("Swagger setup complete...");

    await app.listen(3000);

    console.log("Listening on port 3000...");
  } catch (error) {
    console.error("Error during bootstrap:", error);
  }
}

bootstrap();
