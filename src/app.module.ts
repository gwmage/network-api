import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ApplicationModule } from './modules/application/application.module';
import { MatchingModule } from './modules/matching/matching.module';
import { CommunityModule } from './modules/community/community.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AdminModule } from './modules/admin/admin.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { ScheduleModule } from '@nestjs/schedule';

console.log('Environment variables in app.module:', process.env); // Log environment variables

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Only for development - remove for production
      logging: true, // Enable logging for TypeORM
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    ProfileModule,
    ApplicationModule,
    MatchingModule,
    CommunityModule,
    NotificationModule,
    AdminModule,
    ReservationModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
