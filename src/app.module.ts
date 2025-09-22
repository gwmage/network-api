import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Import your entities and other modules

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        // Add other TypeORM options like entities, synchronize, etc.
        entities: [], // Replace with your actual entities
        synchronize: true, // Set to false in production
        ssl: {
          rejectUnauthorized: false, // Only for development, set to true in production if using SSL
        },
      }),
    }),
    // ... other modules
  ],
  controllers: [], // Add your controllers here
  providers: [], // Add your providers here
})
export class AppModule {}
