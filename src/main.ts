import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  console.log("Starting bootstrap...");
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    console.log("App created...");

    const configService = app.get(ConfigService);

    console.log("Config service retrieved...");

    const config = new DocumentBuilder()
      .setTitle('Proximo API')
      .setDescription('Proximo API description')
      .setVersion('1.0')
      .addTag('proximo')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log("Swagger setup...");

    await app.listen(configService.get<number>('PORT'), '0.0.0.0');
    console.log('Application is running on: ${await app.getUrl()}');
  } catch (error) {
    console.error("Error during startup:", error);
  }
}
bootstrap();
