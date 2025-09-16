import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log("Starting application...");
  try {
    const app = await NestFactory.create(AppModule);
    console.log("NestFactory created.");
    app.enableCors();
    console.log("CORS enabled.");
    const configService = app.get(ConfigService);
    console.log("ConfigService retrieved.");
    const port = configService.get('PORT') || 3000;
    console.log("PORT retrieved.");
    await app.listen(port);
    console.log('Application listening on port ${port}.");
  } catch (error) {
    console.error("Error starting application:", error);
  }
  console.log("Starting application...");
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    const config = new DocumentBuilder()
      .setTitle('Matchmaking API')
      .setDescription('The matchmaking API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    console.log("Application started successfully on port 3000");
  } catch (error) {
    console.error("Error starting application:", error);
  }
}

bootstrap();
