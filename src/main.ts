import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log("Starting bootstrap...");
  try {
    console.log("Creating Nest app...");
    const app = await NestFactory.create(AppModule);
    console.log("Nest app created.");

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
    try {
      console.log("Just before app.listen");
      await app.listen(port);
      console.log("Just after app.listen");
      console.log("After app.listen");
    } catch (error) {
      console.error("Error starting app.listen:", error);
      console.error("Error stack:", error.stack);
      console.log("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
      throw error; 
    }

  } catch (error) {
    console.error("Error during bootstrap:", error);
    console.error("Error stack:", error.stack); 
    console.log("Error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    process.exit(1); 
  }
}

bootstrap();
