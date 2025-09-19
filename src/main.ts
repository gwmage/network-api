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
      await app.listen(3000, '0.0.0.0', () => {
        console.log('Listening on port 3000...');
      });
      console.log("App listening...");
    } catch (error) {
      console.error("Error starting server:", error.stack);
    }
    console.log("App listening...");

    console.log("Environment Variables:", process.env);

    const pg = require('pg');
    const pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL
    });

    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    await delay(5000); // Wait for 5 seconds

    try {
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
