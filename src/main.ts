import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConnection } from 'typeorm';

async function bootstrap() {
  console.log("Before loading .env");
  console.log(process.env);

  console.log("After loading .env");
  console.log(process.env);

  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("RAILWAY_DB_USERNAME:", process.env.RAILWAY_DB_USERNAME);
  console.log("RAILWAY_DB_PASSWORD:", process.env.RAILWAY_DB_PASSWORD);
  console.log("RAILWAY_DB_HOST:", process.env.RAILWAY_DB_HOST);
  console.log("RAILWAY_DB_PORT:", process.env.RAILWAY_DB_PORT);
  console.log("RAILWAY_DB_NAME:", process.env.RAILWAY_DB_NAME);
  console.log("Starting bootstrap...");
  try {
    console.log("1 - Before NestFactory.create");
    console.log("Environment Variables:", process.env);
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("TYPEORM_URL:", process.env.TYPEORM_URL);
    console.log("TYPEORM_CONNECTION:", process.env.TYPEORM_CONNECTION);

    const app = await NestFactory.create(AppModule);
    console.log("2 - NestFactory created...");

    app.use((req, res, next) => {
      console.log('Request received:', req.method, req.url);
      next();
    });

    const port = process.env.PORT || 3000; 
    console.log('3 - Port set to:', port);

    try {
      console.log("4 - Before app.listen");
      await app.listen(port, '0.0.0.0', async () => {
        console.log('5 - Listening on port:', port);

        try {
          console.log("Attempting to get database connection...");
          const connection = await getConnection();
          console.log("Connection object:", connection);
          if (connection.isConnected) {
            console.log('Database connection established successfully!');
          } else {
            console.error('Database connection failed!');
            console.error("Connection object:", connection);
          }
        } catch (error) {
          console.error('Error checking database connection:', error);
          console.error('Error stack:', error.stack);
          throw error; 
        }
      });
      console.log("6 - After app.listen");
      console.log("Application started successfully.");

    } catch (error) {
      console.error("Error starting server:", error);
      console.error("Error starting server stack:", error.stack);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error during bootstrap:", error);
    console.error("Error during bootstrap stack:", error.stack);
    process.exit(1);
  }
}

bootstrap();
