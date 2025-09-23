import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Starting bootstrap...");
  try {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    app.enableCors();
    const config = new DocumentBuilder()
      .setTitle('Proximo API')
      .setDescription('The Proximo API description')
      .setVersion('1.0')
      .addTag('proximo')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
  } catch(e) {
    console.error("Error during bootstrap:", e);
  }
  console.log("Bootstrap complete.");
  try {
    console.log('Starting application bootstrap...');
    const app = await NestFactory.create(AppModule);
    console.log('Application instance created.');
    await app.listen(3000);
    console.log('Application listening on port 3000.');
  } catch (error) {
    console.error('Error during application bootstrap:', error);
  }
}

bootstrap();
