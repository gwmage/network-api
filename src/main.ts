import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';

async function bootstrap() {
  try {
    console.log("Starting bootstrap...");
    console.log("Environment variables:", process.env);

    const app = await NestFactory.create(AppModule);

    console.log("Nest app created...");

    const config = new DocumentBuilder()
      .setTitle('capstone')
      .setDescription('The capstone API description')
      .setVersion('1.0')
      .addTag('capstone')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    const db_url = process.env.DATABASE_URL || process.env.TYPEORM_CONNECTION;
    console.log("Database URL:", db_url);
    console.log("All environment variables:", process.env);
    console.log("TYPEORM_CONNECTION:", process.env.TYPEORM_CONNECTION);

    const connectionOptions = connection.options;
    console.log("TypeORM connection options:", connectionOptions);

    const connection = app.get(TypeOrmModule);

    console.log("Attempting to connect to the database...");

    // Attempt to ping the database to ensure it's up and the credentials are correct.
    try {
      await connection.query('SELECT 1'); // A simple query to check the connection
      console.log("Database connection successful.");
    } catch (error) {
      console.error("Error pinging the database:", error);
      process.exit(1);
    }

    const port = process.env.PORT || 3000;
    console.log("Trying to listen on port:", port);
    console.log("Before app.listen");
    await app.listen(port);
    console.log("After app.listen");

    console.log('Application is running on: ${await app.getUrl()}');

  } catch (error) {
    console.error("Error during bootstrap:", error);
    process.exit(1);
  }
}
bootstrap();
