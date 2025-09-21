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
          const url = process.env.DATABASE_URL || process.env.TYPEORM_URL || process.env.TYPEORM_CONNECTION;
          console.log("URL accessed from DATABASE_URL:", process.env.DATABASE_URL);
          console.log("URL accessed from TYPEORM_URL:", process.env.TYPEORM_URL);
          console.log("URL accessed from TYPEORM_CONNECTION:", process.env.TYPEORM_CONNECTION);
          console.log("Final URL used:", url);
          if (!url) {
            console.error("No database URL found in environment variables!");
            process.exit(1);
          }
          const config = {
            type: 'postgres',
            url: url,
            entities: [],
            synchronize: true,
            connectTimeoutMS: 30000, 
            retryAttempts: 20,
            retryDelay: (attempt) => Math.pow(2, attempt) * 1000,
            onRetry: (err, count) => {
              console.error('Retry attempt ${count} failed. Error:', err);
              console.error("Environment Variables:", process.env);
            },
          };
          console.log("After TypeORM config creation", config);
          return config;
        } catch (error) {
          console.error("Error creating TypeORM config:", error);
          throw error; 
        }
      },
    }),
    // Modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}