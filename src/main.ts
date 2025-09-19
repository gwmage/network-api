import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log("Starting bootstrap...");
    console.log("1 - Before NestFactory.create");
    const app = await NestFactory.create(AppModule);
    console.log("2 - NestFactory created...");

    app.use((req, res, next) => {
      console.log('Request received: ${req.method} ${req.url}');
      next();
    });

    const port = process.env.PORT || 3000; 
    console.log('3 - Port set to: ${port}');

    console.log("4 - Before app.listen");
    await app.listen(port, '0.0.0.0');
    console.log('5 - Listening on port ${port}...');

    console.log("6 - Before environment variables log");
    console.log("Environment Variables:", process.env);
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("TYPEORM_URL:", process.env.TYPEORM_URL);

    console.log("7 - Before pg require");
    const pg = require('pg');
    console.log("8 - Creating pg pool...");
    const pool = new pg.Pool({
      connectionString: process.env.TYPEORM_URL
    });
    console.log("9 - pg pool created...");

    try {
      console.log("10 - Attempting database connection...");
      await pool.query('SELECT 1');
      console.log('11 - Database connection successful!');
    } catch (err) {
      console.error('12 - Error connecting to database:', err);
    }

  } catch (error) {
    console.error("13 - Error during bootstrap:", error);
  }
}

bootstrap();
