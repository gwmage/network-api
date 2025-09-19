import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log("Starting bootstrap...");
    const app = await NestFactory.create(AppModule);
    console.log("NestFactory created...");

    app.use((req, res, next) => {
      console.log('Request received: ${req.method} ${req.url}');
      next();
    });

    try {
      console.log("Attempting to listen on port 3000...");
      await app.listen(3000, '0.0.0.0', () => {
        console.log('Listening on port 3000...');
      });
      console.log("App listening...");
    } catch (error) {
      console.error("Error starting server:", error.stack);
    }

    console.log("Environment Variables:", process.env);
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    const pg = require('pg');
    console.log("Creating pg pool...");
    const pool = new pg.Pool({
      connectionString: process.env.TYPEORM_URL
    });
    console.log("pg pool created...");

    try {
      console.log("Attempting database connection...");
      await pool.query('SELECT 1');
      console.log('Database connection successful!');
    } catch (err) {
      console.error('Error connecting to database:', err);
    }

  } catch (error) {
    console.error("Error during bootstrap:", error);
  }
}

bootstrap();
