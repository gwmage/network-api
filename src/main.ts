import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    console.log("Starting bootstrap...");
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Project Ephesus')
      .setDescription('The project Ephesus API description')
      .setVersion('1.0')
      .addTag('project-ephesus')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT || 3000;
    console.log('PORT is ${port}');
    await app.listen(port);
    console.log('Application is running on: ${await app.getUrl()}');
  } catch (error) {
    console.error("Error during bootstrap:", error);
    console.error("Error stack:", error.stack);
    console.error("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    process.exit(1);
  }
}

bootstrap();
