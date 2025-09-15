import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as serverless from 'serverless-http';
import { express } from '@nestjs/platform-express';

export const handler = async (req: any, res: any): Promise<any> => {
  let app;
  try {
     app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      origin: ['http://localhost:4200', 'https://your-frontend-domain.com'], // Replace with your frontend URLs
      credentials: true,
    });
    await app.init();
    const server = serverless(express(app),
    // Binary settings for files over a specific size
    { binary: ['image/*', 'application/octet-stream', 'application/pdf'] },
 );

    return server(req, res);
  } catch (error) {
    console.error('Error starting NestJS application:', error);
    // Ensure a response is sent even in case of error
    if (res && typeof res.status === 'function' && typeof res.send === 'function') {
      res.status(500).send('Internal Server Error');
    }
    throw error; // Re-throw the error for logging and debugging purposes
  }
};
