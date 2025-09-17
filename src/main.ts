import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log("Starting bootstrap...");
  try {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Project Ephesus')
      .setDescription('The project Ephesus API description')
      .setVersion('1.0')
      .addTag('project-ephesus')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log("Before app.listen");
    const port = process.env.PORT || 3000;
    console.log('PORT is ${port}');
    await app.listen(port);
    console.log("After app.listen");
  } catch (error) {
    console.error("Error starting application:", error);
  }
}

bootstrap();
