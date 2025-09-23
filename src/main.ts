import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Connection } from 'typeorm'; 

async function bootstrap() {
  try {
    console.log("Application bootstrapping...");
    const port = parseInt(process.env.PORT || "3000", 10);

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'] 
    });

    try {
      const connection = app.get(Connection);
      await connection.connect(); 
      if (connection.isConnected) {
        console.log('Database connected!');
        try {
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
      try {
      const server = await app.listen(port, '0.0.0.0');
      console.log('[${new Date().toISOString()}] Server listening on port ${port}');
      console.log('[${new Date().toISOString()}] Server address:', server.address());
    } catch (listenError) {
      console.error('[${new Date().toISOString()}] Error listening on port ${port}:', listenError);
      console.error('Detailed listen error:', listenError.stack);
      throw listenError;
    }
      console.log('[${new Date().toISOString()}] Server listening on port ${port}');
    } catch (error) {
      console.error('[${new Date().toISOString()}] Error starting server:', error);
      console.error('Detailed error:', error.stack); 
      throw error;
    }
  } catch (innerError) {
      console.error('[${new Date().toISOString()}] Caught an inner error during bootstrap:', innerError);
      console.error('Inner error details:', innerError.stack);
      throw innerError; 
    }
}

bootstrap();
