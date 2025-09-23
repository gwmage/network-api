import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Connection } from 'typeorm'; 

async function bootstrap() {
  console.log("Starting application...");
  try {
    console.log('[${new Date().toISOString()}] Application bootstrapping...');
    const port = parseInt(process.env.PORT || "3000", 10);

    console.log('[${new Date().toISOString()}] Creating NestJS application...');
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'] 
    });

    try {
      console.log('[${new Date().toISOString()}] Getting database connection...');
      const connection = app.get(Connection);
      console.log('[${new Date().toISOString()}] Attempting database connection...');
      console.log('[${new Date().toISOString()}] Connection options:', connection.options);
      console.log('[${new Date().toISOString()}] Database Environment Variables: ', process.env);
      console.log('[${new Date().toISOString()}] TYPEORM_DATABASE: ', process.env.TYPEORM_DATABASE);
      console.log('[${new Date().toISOString()}] TYPEORM_USERNAME: ', process.env.TYPEORM_USERNAME);
      console.log('[${new Date().toISOString()}] TYPEORM_PASSWORD: ', process.env.TYPEORM_PASSWORD);
      console.log('[${new Date().toISOString()}] TYPEORM_HOST: ', process.env.TYPEORM_HOST);
      console.log('[${new Date().toISOString()}] TYPEORM_PORT: ', process.env.TYPEORM_PORT);
      try {
        console.log('[${new Date().toISOString()}] Connection options before connect:', connection.options);
        await connection.connect();
        console.log('[${new Date().toISOString()}] After connection.connect() - Is connected?', connection.isConnected);
      
      } catch (dbConnectionError) {
        console.error('[${new Date().toISOString()}] Database connection error:', dbConnectionError);
        console.error('[${new Date().toISOString()}] Database connection error stack:', dbConnectionError.stack);
        throw dbConnectionError;
      } 
      if (connection.isConnected) {
        console.log('[${new Date().toISOString()}] Database connected!');
        try {
          console.log('[${new Date().toISOString()}] Executing test query...');
          await connection.query('SELECT 1');
          console.log('[${new Date().toISOString()}] Successfully executed a test query against the database!');
        } catch (queryError) {
          console.error('[${new Date().toISOString()}] Error executing test query:', queryError);
          console.error('[${new Date().toISOString()}] Query error stack trace:', queryError.stack);
          throw queryError;
        }
      } else {
        console.error('[${new Date().toISOString()}] Database connection failed!');
        throw new Error('Database connection failed');
      }

      try {
        console.log('[${new Date().toISOString()}] Attempting to listen on port ${port}...');
        console.log("[${new Date().toISOString()}] Before starting to listen on port ${port}...");
const server = await app.listen(port, '0.0.0.0');
console.log("[${new Date().toISOString()}] After starting to listen on port ${port}...");
        console.log(`[${new Date().toISOString()}] Application URL: http://localhost:${port}`);
        try {
          const appUrl = `http://localhost:${port}`;
          console.log(`[${new Date().toISOString()}] Attempting to access application at: ${appUrl}`);
          const response = await fetch(appUrl);
          console.log(`[${new Date().toISOString()}] Application access response status: ${response.status}`);
          console.log(`[${new Date().toISOString()}] Application access response text: ${await response.text()}`);
          console.log(`[${new Date().toISOString()}] Deployment URL (from environment variables):`, process.env.RAILWAY_STATIC_URL);
          if (process.env.RAILWAY_STATIC_URL) {
            try {
              const railwayUrl = new URL(process.env.RAILWAY_STATIC_URL);
              console.log(`[${new Date().toISOString()}] Railway hostname:`, railwayUrl.hostname);
            } catch (urlError) {
              console.error(`[${new Date().toISOString()}] Invalid Railway URL:`, urlError);
            }
          }
        } catch (appAccessError) {
          console.error(`[${new Date().toISOString()}] Error accessing application:`, appAccessError);
        }
        console.log('[${new Date().toISOString()}] Server address:', server.address());
        const addressInfo = server.address();
        let host = 'localhost';
        let portInfo = port;
        if (typeof addressInfo === 'string') {
          const parts = addressInfo.split(':');
          host = parts[0] || 'localhost';
          portInfo = parseInt(parts[1], 10);
        } else if (typeof addressInfo === 'object') {
          host = addressInfo.address || 'localhost';
          portInfo = addressInfo.port || port;
        }
        console.log(`[${new Date().toISOString()}] Server is listening on ${host}:${portInfo}`);
        console.log('[${new Date().toISOString()}] Server address:', server.address());
        console.log('[${new Date().toISOString()}] Server listening on:', server.address().address);
        console.log('[${new Date().toISOString()}] Server port:', server.address().port);
        console.log('[${new Date().toISOString()}] Server address:', server.address());
        console.log('[${new Date().toISOString()}] Server listening on port ${port}');
        console.log('[${new Date().toISOString()}] Environment variables:', process.env);
      } catch (listenError) {
        console.error('[${new Date().toISOString()}] Error listening on port ${port}:', listenError);
        console.error('[${new Date().toISOString()}] Detailed listen error:', listenError.stack);
        throw listenError;
      }
    } catch (error) {
      console.error('[${new Date().toISOString()}] Error starting server:', error);
      console.error('[${new Date().toISOString()}] Detailed error:', error.stack); 
      throw error;
    }
  } catch (innerError) {
      console.error('[${new Date().toISOString()}] Caught an inner error during bootstrap:', innerError);
      console.error('[${new Date().toISOString()}] Inner error details:', innerError.stack);
      throw innerError; 
    }
}

bootstrap();
