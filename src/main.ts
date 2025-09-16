import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    console.log('Starting application bootstrap...');
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    console.log('Application created...');

    const config = new DocumentBuilder()
      .setTitle('Matching App API')
      .setDescription('The Matching App API description')
      .setVersion('1.0')
      .build();
    console.log('Swagger config built...');

    const document = SwaggerModule.createDocument(app, config);
    console.log('Swagger document created...');

    SwaggerModule.setup('api', app, document);
    console.log('Swagger setup complete...');

    await app.listen(3000);
    console.log('App listening on port 3000...');
  } catch (error) {
    console.error('An error occurred during bootstrap:', error);
  }
}

bootstrap();
