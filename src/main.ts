import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';

console.log("Compiled files:", fs.readdirSync('./dist'));
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Application bootstrapping...");
  console.log('Starting application bootstrap...');
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    const port = 3000;

    console.log('Attempting to listen on port: ${port}');

    const startTime = Date.now();
console.log('[${new Date().toISOString()}] Attempting to listen on port: ${port}');
await app.listen(port, (err, address) => {
  console.log('[${new Date().toISOString()}] app.listen callback invoked');
  if (err) {
    console.error('[${new Date().toISOString()}] Error starting server:', err);
  } else {
    console.log('[${new Date().toISOString()}] Server listening at ${address}');
  }
  console.log('[${new Date().toISOString()}] Time to start listening: ${Date.now() - startTime}ms');
      if (err) {
        console.error('Error starting server:', err);
      } else {
        console.log('Server listening at ${address}');
      }
    });

    console.log('Application bootstrap complete.');
  console.log('Environment variables:', process.env);
  console.log('Current working directory:', process.cwd());
  console.log('Directory contents:', fs.readdirSync('.'));
  } catch (error) {
    console.error('Error during application bootstrap:', error);
  }
}

bootstrap();
