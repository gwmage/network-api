import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from '@modules/admin/admin.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CommunityModule } from '@modules/community/community.module';
import { NotificationModule } from '@modules/notification/notification.module';
import { MatchingModule } from '@modules/matching/matching.module';
import { ApplicationModule } from '@modules/application/application.module';
import { UsersModule } from '@modules/users/users.module';
import { ReservationModule } from '@modules/reservation/reservation.module';
import { ProfileModule } from '@modules/profile/profile.module';
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