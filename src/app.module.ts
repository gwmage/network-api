import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules imports

// Entities imports

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
      try {
        console.log("Before TypeORM config creation");
        console.log("Accessing url from process.env");
        const url = process.env.DATABASE_URL;
        console.log("URL accessed: ", url);
        const config = {
          type: 'postgres',
          url: url,
          entities: [],
          synchronize: true,
          retryAttempts: 10,
          retryDelay: 3000, // 3 seconds
          onRetry: (err, count) => {
            console.log('Retry attempt ${count} to connect to database. Error: ${err}');
          },
        };
        console.log("After TypeORM config creation", config);
        return config;
      } catch (error) {
        console.error("Error creating TypeORM config:", error);
        throw error; // Re-throw to halt the application startup
      }
    },
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [],
        synchronize: true,
        retryAttempts: 10,
        retryDelay: 3000, // 3 seconds
        onRetry: (err, count) => {
          console.log('Retry attempt ${count} to connect to database. Error: ${err}');
        },
      }),
    }),

    // Modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
