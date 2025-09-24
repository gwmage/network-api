import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CommunityModule } from './modules/community/community.module.js';
import { NotificationModule } from './modules/notification/notification.module.js';
import { MatchingModule } from './modules/matching/matching.module.js';
import { ApplicationModule } from './modules/application/application.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { ReservationModule } from './modules/reservation/reservation.module.js';
import { ProfileModule } from './modules/profile/profile.module.js';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    AdminModule,
    AuthModule,
    CommunityModule,
    NotificationModule,
    MatchingModule,
    ApplicationModule,
    UsersModule,
    ReservationModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
