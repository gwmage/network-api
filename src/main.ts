import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log("Starting bootstrap...");
    console.log("1 - Before NestFactory.create");
    console.log("Environment Variables:", process.env);
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("TYPEORM_URL:", process.env.TYPEORM_URL);
    console.log("TYPEORM_CONNECTION:", process.env.TYPEORM_CONNECTION);
    try {
      const app = await NestFactory.create(AppModule);
    } catch (error) {
      console.error("Error creating NestJS application:", error);
      process.exit(1);
    }
    console.log("2 - NestFactory created...");

    app.use((req, res, next) => {
      console.log('Request received: ${req.method} ${req.url}');
      next();
    });

    const port = process.env.PORT || 3000; 
    console.log('3 - Port set to: ${port}');

    try {
      console.log("4 - Before app.listen");
      await app.listen(port, '0.0.0.0');
      console.log('5 - Listening on port ${port}...');
    } catch (error) {
      console.error("Error starting server:", error);
      process.exit(1);
    }

    console.log("6 - After app.listen");

  } catch (error) {
        console.error("13 - Error during bootstrap:", error);
        process.exit(1);
  }
}

bootstrap();
