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
        host: process.env.RAILWAY_DB_HOST,
        port: parseInt(process.env.RAILWAY_DB_PORT || '5432', 10),
        username: process.env.RAILWAY_DB_USERNAME,
        password: process.env.RAILWAY_DB_PASSWORD,
        database: process.env.RAILWAY_DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
        ssl:  process.env.NODE_ENV === 'production' 
          ? { rejectUnauthorized: false } 
          : false,
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
    console.log("RAILWAY_DB_HOST:", process.env.RAILWAY_DB_HOST);
    console.log("RAILWAY_DB_PORT:", process.env.RAILWAY_DB_PORT);
    console.log("RAILWAY_DB_USERNAME:", process.env.RAILWAY_DB_USERNAME);
    console.log("RAILWAY_DB_PASSWORD:", process.env.RAILWAY_DB_PASSWORD);
    console.log("RAILWAY_DB_NAME:", process.env.RAILWAY_DB_NAME);
  }
}
