import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

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
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    console.log('Attempting to start server on port', port);
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
    console.log('Server URL:', app.getUrl());
    console.log('Application bootstrap complete.');
  } catch (error) {
    console.error('[${new Date().toISOString()}] Caught error during app.listen:', error);
    console.error('Error details:', error);
    process.exit(1);
  }
}

console.log('Calling bootstrap function...');
bootstrap();
