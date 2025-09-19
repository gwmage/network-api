import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    console.error("Bootstrap function starting...");
    console.error("Environment variables:", process.env);
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

    console.error("AppModule created.");
    const port = process.env.PORT || 3000;
    console.error("TYPEORM_CONNECTION:", process.env.TYPEORM_CONNECTION);
    console.error("DATABASE_URL:", process.env.DATABASE_URL);
    console.error("TYPEORM_URL:", process.env.TYPEORM_URL);
    console.error("PORT:", port);
    await app.listen(port, '0.0.0.0');
    console.error('Application listening on port ${port}.');
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1);
  }
}

bootstrap();
