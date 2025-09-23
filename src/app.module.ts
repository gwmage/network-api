import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommunityModule } from './modules/community/community.module';
import { MatchingModule } from './modules/matching/matching.module';
import { ApplicationModule } from './modules/application/application.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AdminModule } from './modules/admin/admin.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule, UsersModule, CommunityModule, MatchingModule, ApplicationModule,
    ProfileModule, ReservationModule, NotificationModule, AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    this.logger.log('AppModule initialized.');
    this.logger.log('AuthModule imported.');
    this.logger.log('UsersModule imported.');
    this.logger.log('CommunityModule imported.');
    this.logger.log('MatchingModule imported.');
    this.logger.log('ApplicationModule imported.');
    this.logger.log('ProfileModule imported.');
    this.logger.log('ReservationModule imported.');
    this.logger.log('NotificationModule imported.');
    this.logger.log('AdminModule imported.');
  }
}