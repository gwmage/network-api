import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Connection } from 'typeorm'; 

async function bootstrap() {
  try {
    console.log("Application bootstrapping...");
    console.log('Compiled files:', fs.readdirSync('./dist'));
    const port = parseInt(process.env.PORT || "3000", 10);
    console.log('[${new Date().toISOString()}] Attempting to listen on port: ${port}');
    console.log('Environment variables:', process.env);
    console.log('Process ID:', process.pid);
    console.log('Current working directory:', process.cwd());
    console.log('Directory contents:', fs.readdirSync('.'));
    console.log('PORT environment variable:', process.env.PORT);

    const databaseUrl = process.env.DATABASE_URL;
    console.log('DATABASE_URL environment variable:', databaseUrl);

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
      throw urlError; 
    }

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'] 
    });
    console.log('NestFactory.create completed.'); 
    const connection = app.get(Connection);
    try {
      await connection.connect(); 
      console.log('Connection attempt complete. Connection status:', connection.isConnected);
      if (connection.isConnected) {
        console.log('Database connected!');
      } else {
        console.error('Database connection failed!');
      }

      const entities = connection.entityMetadatas;
      console.log('Connected entities:', entities.map(entity => entity.name));
      await connection.query('SELECT 1');
      console.log('Successfully executed a test query against the database!');
      await app.listen(port, '0.0.0.0');
      console.log('[${new Date().toISOString()}] Server listening on port ${port}');
      console.log('app.getUrl():', app.getUrl());
    } catch (error) {
      console.error('[${new Date().toISOString()}] Error after successful database connection:', error);
      console.error('Detailed error:', error.stack); // Log the stack trace for debugging
      throw error;
    }
  } catch (innerError) {
      console.error('[${new Date().toISOString()}] Caught an inner error during bootstrap:', innerError);
      console.error('Inner error details:', innerError.stack);
      throw innerError; // Re-throw to be caught by the outer try-catch
    }
  } catch (error) {
    console.error('[${new Date().toISOString()}] Caught an error during bootstrap:', error);
    console.error('Error details:', error.stack);
    process.exit(1);
  }
}

bootstrap();
console.log('[${new Date().toISOString()}] After bootstrap call');
