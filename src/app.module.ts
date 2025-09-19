import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

// other imports ...

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true // Set to false in production
      })
    }),
    // other imports ...
  ],
  controllers: [AppController, /* other controllers */],
  providers: [AppService, /* other providers */],
})
export class AppModule implements OnModuleInit{
  onModuleInit() {
    console.log("AppModule initializing...");
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("TYPEORM_URL:", process.env.TYPEORM_URL);
    console.log("TYPEORM_CONNECTION:", process.env.TYPEORM_CONNECTION);
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_PORT:", process.env.DB_PORT);
    console.log("DB_USERNAME:", process.env.DB_USERNAME);
    console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
    console.log("DB_NAME:", process.env.DB_NAME);
  }
}
