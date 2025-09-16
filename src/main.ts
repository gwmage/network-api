import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log('Starting application bootstrap...');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  console.log('NestFactory created...');

  const config = new DocumentBuilder()
    .setTitle('Matchmaking API')
    .setDescription('The Matchmaking API description')
    .setVersion('1.0')
    .addTag('matchmaking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('Swagger setup complete...');

  await app.listen(3000);

  console.log('App listening on port 3000...');
}

bootstrap().catch(err => {
  console.error('Fatal error during bootstrap:', err);
  process.exit(1);
});
