import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("Application bootstrapping...");
  console.log('Compiled files:', fs.readdirSync('./dist'));
  try {
    const port = 3000;
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
        console.error('Error details:', err.stack); // Log the error stack for more context
        throw err; // Re-throw the error to be caught by the outer catch block
      } else {
        console.log('[${new Date().toISOString()}] Server listening at ${address}');
      }
    });
    console.log('Server started successfully.');
    console.log('Application bootstrap complete.');
  } catch (error) {
    console.error('[${new Date().toISOString()}] Caught error during app.listen:', error);
    console.error('Error details:', error);
    process.exit(1); // Exit the process with a non-zero code to indicate failure
  }
}

console.log('Calling bootstrap function...');
bootstrap();
