import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommunityModule } from './modules/community/community.module';
import { NotificationModule } from './modules/notification/notification.module';
import { MatchingModule } from './modules/matching/matching.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ApplicationModule } from './modules/application/application.module';
import { UsersModule } from './modules/users/users.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ScheduleModule.forRoot(),
    AdminModule,
    AuthModule,
    CommunityModule,
    NotificationModule,
    MatchingModule,
    ProfileModule,
    ApplicationModule,
    UsersModule,
    ReservationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
