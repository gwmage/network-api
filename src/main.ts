import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log("Starting application...");
  try {
    const adapter = new FastifyAdapter({
      logger: true
    });
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

    const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000, '0.0.0.0');
    console.log('Application is running on: ${await app.getUrl()}');
  } catch (error) {
    console.error('Unhandled exception during startup:', error);
  }
}

bootstrap();
