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

    console.log('Creating NestFastifyApplication...');
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'] 
    });
    console.log('NestFactory.create completed.'); 

    try {
      const connection = app.get(Connection);
      console.log('Attempting database connection...');
      await connection.connect(); 
      console.log('Connection attempt complete. Connection status:', connection.isConnected);
      if (connection.isConnected) {
        console.log('Database connected!');
        try {
          const entities = connection.entityMetadatas;
          console.log('Connected entities:', entities.map(entity => entity.name));
          console.log('Attempting test query...');
          await connection.query('SELECT 1');
          console.log('Successfully executed a test query against the database!');
        } catch (queryError) {
          console.error('Error executing test query:', queryError);
          throw queryError;
        }
      } else {
        console.error('Database connection failed!');
        throw new Error('Database connection failed');
      }

      console.log('[${new Date().toISOString()}] Attempting to start server on port ${port}...');
      await app.listen(port, '0.0.0.0');
      console.log('[${new Date().toISOString()}] Server listening on port ${port}');
      console.log('app.getUrl():', app.getUrl());
    } catch (error) {
      console.error('[${new Date().toISOString()}] Error starting server:', error);
      console.error('Detailed error:', error.stack); 
      throw error;
      } catch (appStartError) {
        console.error('[${new Date().toISOString()}] Error during application initialization:', appStartError);
        console.error('Application initialization error details:', appStartError.stack);
        throw appStartError;
      }
    }
  } catch (innerError) {
      console.error('[${new Date().toISOString()}] Caught an inner error during bootstrap:', innerError);
      console.error('Inner error details:', innerError.stack);
      throw innerError; 
    }
} 

bootstrap();
console.log('[${new Date().toISOString()}] After bootstrap call');
