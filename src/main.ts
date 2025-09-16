import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('Starting application...');
  try {
    const adapter = new FastifyAdapter({
      logger: true,
    });
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

    const config = new DocumentBuilder()
      .setTitle('Matching App API Documentation')
      .setDescription('API documentation for the matching application.')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000, '0.0.0.0');
    console.log('Application started successfully on port 3000.');
  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1);
  }
}

bootstrap();
