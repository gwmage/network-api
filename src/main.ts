import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { createConnection, Connection } from 'typeorm'; // Import createConnection

async function bootstrap() {
  console.log("Application bootstrapping...");

  try {
    const port = parseInt(process.env.PORT || "3000", 10);

    const databaseUrl = process.env.DATABASE_URL;
    console.log('DATABASE_URL environment variable:', databaseUrl); // Log DATABASE_URL before connection

    try {
      console.log('Attempting to connect to the database...');
      const connection = await createConnection(); // Create connection here
      console.log('Database connection successful!', connection.isConnected);

      const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'] // Enable verbose logging for NestJS
      });
      console.log('NestFactory.create completed.'); // Log after NestFactory.create

      await app.listen(port, '0.0.0.0', (err, address) => {
        if (err) {
          console.error('[${new Date().toISOString()}] Error starting server:', err);
          console.error('Error details:', err.stack); 
          throw err; 
        } else {
          console.log('[${new Date().toISOString()}] Server listening at ${address}');
        }
      });
      console.log('Server started successfully.');

    } catch (dbError) {
      console.error('[${new Date().toISOString()}] Database connection error:', dbError);
      console.error('Database error details:', dbError.stack);
      console.error('DATABASE_URL:', process.env.DATABASE_URL);  // Log database URL
      throw dbError; // Re-throw to prevent application startup
    }

    console.log('Application bootstrap complete.');
  } catch (error) {
    console.error('[${new Date().toISOString()}] Caught error during app.listen:', error);
    console.error('Error details:', error.stack); // Log error stack for more details
    process.exit(1);
  }
}

console.log('Calling bootstrap function...');
bootstrap();
