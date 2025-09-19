import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CommunityModule } from './modules/community/community.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MatchingModule } from './modules/matching/matching.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ApplicationModule } from './modules/application/application.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { scheduleConfig } from 'config/schedule.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        TYPEORM_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      url: process.env.TYPEORM_URL,
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    ScheduleModule.forRoot(),
    AdminModule,
    AuthModule,
    UsersModule,
    CommunityModule,
    ProfileModule,
    MatchingModule,
    NotificationModule,
    ApplicationModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [scheduleConfig],
})
export class AppModule {
  constructor() {
    console.error("AppModule initialized.");
    console.error("TYPEORM_URL:", process.env.TYPEORM_URL);
  }
}
