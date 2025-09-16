import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('Starting application bootstrap...');

  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

  console.log('Application created...');

  try {
    // Add logging before and after search_block interaction
    console.log('Before search_block interaction...');

    // Placeholder for search_block interaction: replace with actual function call once identified
    // const searchBlockResult = await someSearchBlockFunction(); 
    // console.log('search_block result:', searchBlockResult);

    console.log('After search_block interaction...');


    const config = new DocumentBuilder()
      .setTitle('MATCH backend')
      .setDescription('The MATCH backend API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log('Swagger setup complete...');

    await app.listen(3000, '0.0.0.0');

    console.log('Application listening on port 3000...');
  } catch (error) {
    console.error('Error during application startup:', error);
  }
}

bootstrap();
