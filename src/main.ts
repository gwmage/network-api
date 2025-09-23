import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Connection } from 'typeorm'; // Import Connection

async function bootstrap() {
  console.log("Application bootstrapping...");
  console.log('Compiled files:', fs.readdirSync('./dist'));
  try {
    const port = parseInt(process.env.PORT || "3000", 10);
    console.log('[${new Date().toISOString()}] Attempting to listen on port: ${port}');
    console.log('Environment variables:', process.env);
    console.log('Process ID:', process.pid);
    console.log('Current working directory:', process.cwd());
    console.log('Directory contents:', fs.readdirSync('.'));
    console.log('PORT environment variable:', process.env.PORT);

    const databaseUrl = process.env.DATABASE_URL;
    console.log('DATABASE_URL environment variable:', databaseUrl); // Log DATABASE_URL before connection
    console.log('Attempting to parse the database URL...');

    try {
      const url = new URL(databaseUrl);
      console.log('Parsed database URL:', url);
      console.log('Hostname:', url.hostname);
      console.log('Port:', url.port);
      console.log('Username:', url.username);
      console.log('Password:', url.password);
      console.log('Database name:', url.pathname.slice(1));
    } catch (urlError) {
      console.error('Error parsing DATABASE_URL:', urlError);
      console.error('Make sure DATABASE_URL is set correctly in the environment variables.');
      throw urlError; // Re-throw error to prevent application startup
    }

    try {
      console.log('Attempting to connect to the database...');
      const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'] // Enable verbose logging for NestJS
      });
      console.log('NestFactory.create completed.'); // Log after NestFactory.create
      const connection = app.get(Connection);

      try {
        await connection.connect(); // Explicitly attempt connection
        console.log('Database connection successful!', connection.isConnected);
      } catch (dbError) {
        console.error('[${new Date().toISOString()}] Database connection error:', dbError);
        console.error('Database error details:', dbError.stack); // Log the full error object for detailed stack trace
        console.error('DATABASE_URL:', process.env.DATABASE_URL);  // Log database URL
        throw dbError; // Re-throw to prevent application startup
      }

      await app.listen(port, '0.0.0.0');
      console.log('[${new Date().toISOString()}] Server listening on port ${port}');
    } catch (error) {
      console.error('[${new Date().toISOString()}] Error during app initialization or database connection:', error);
      console.error('Error details:', error.stack);
      throw error; // Re-throw error to prevent application startup
    }
  } catch (error) {
    console.error('[${new Date().toISOString()}] Caught error during bootstrap:', error);
    console.error('Error details:', error.stack);
    process.exit(1);
  }
}

console.log('Calling bootstrap function...');
bootstrap();
