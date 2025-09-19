import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    console.error(JSON.stringify("Bootstrap function starting..."));
    console.error(JSON.stringify({ env: process.env }));
    const app = await NestFactory.create(AppModule);
    const logger = new Logger();
    app.useLogger(logger);

    console.log = (message: any, ...optionalParams: any[]) => {
      process.stdout.write(JSON.stringify(message) + '
');
      if (optionalParams) {
        optionalParams.forEach(param => process.stdout.write(JSON.stringify(param) + '
'));
      }
    };

    console.error = (message: any, ...optionalParams: any[]) => {
      process.stderr.write(JSON.stringify(message) + '
');
      if (optionalParams) {
        optionalParams.forEach(param => process.stderr.write(JSON.stringify(param) + '
'));
      }
    };

    console.error(JSON.stringify("AppModule created."));
    const port = process.env.PORT || 3000;
    console.error(JSON.stringify({ TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION }));
    console.error(JSON.stringify({ DATABASE_URL: process.env.DATABASE_URL }));
    console.error(JSON.stringify({ TYPEORM_URL: process.env.TYPEORM_URL }));
    console.error(JSON.stringify({ port }));
    console.error("Before app.listen");
    try {
      await app.listen(port, '0.0.0.0');
      console.error(JSON.stringify('Application listening on port ${port}.'));
    } catch (error) {
      console.error(JSON.stringify("Error in app.listen:"), error);
      console.error(JSON.stringify("Error stack:"), JSON.stringify(error.stack));
    }
    console.error("After app.listen");
    console.error(JSON.stringify('Application listening on port ${port}.'));
  } catch (error) {
    console.error(JSON.stringify("Error starting application:"), error);
    console.error(JSON.stringify("Error stack:"), JSON.stringify(error.stack)); 
    process.exit(1); 
  }
}

bootstrap();
