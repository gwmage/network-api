import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { ApplicationModule } from './modules/application/application.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CommunityModule } from './modules/community/community.module';
import { MatchingModule } from './modules/matching/matching.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL') || `postgres://${process.env.RAILWAY_DB_USERNAME}:${process.env.RAILWAY_DB_PASSWORD}@${process.env.RAILWAY_DB_HOST}:${process.env.RAILWAY_DB_PORT}/${process.env.RAILWAY_DB_NAME}?schema=public`,
        entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
        synchronize: false, // Set to false in production
        autoLoadEntities: true,
        logging: ['error', 'warn', 'log'], // Log errors, warnings, and general logs
        keepConnectionAlive: true, // Important for Railway to maintain the connection
      }),
    }),
    AdminModule,
    ApplicationModule,
    AuthModule,
    UsersModule,
    CommunityModule,
    MatchingModule,
    NotificationModule,
    ProfileModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
