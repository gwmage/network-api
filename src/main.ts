import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log('Starting application bootstrap...');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  console.log('NestFactory created...');

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  console.log('Swagger config built...');

  const document = SwaggerModule.createDocument(app, config);
  console.log('Swagger document created...');

  SwaggerModule.setup('api', app, document);
  console.log('Swagger setup complete...');

  try {
    console.log('Attempting to listen on port 3000...');
    await app.listen(3000);
    console.log('Successfully listening on port 3000');
  } catch (error) {
    console.error('Failed to start application:', error);
  }
}

bootstrap();
