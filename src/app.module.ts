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
    }).then(() => console.log('Database connected successfully')).catch(error => console.error('Database connection failed:', error)),
      }),
    }),
    ScheduleModule.forRoot(),
    try {
      AdminModule,
      console.log('AdminModule loaded successfully.');
    } catch (error) {
      console.error('Error loading AdminModule:', error);
    }
    try {
      AuthModule,
      console.log('AuthModule loaded successfully.');
    } catch (error) {
      console.error('Error loading AuthModule:', error);
    }
    try {
      CommunityModule,
      console.log('CommunityModule loaded successfully.');
    } catch (error) {
      console.error('Error loading CommunityModule:', error);
    }
    try {
      NotificationModule,
      console.log('NotificationModule loaded successfully.');
    } catch (error) {
      console.error('Error loading NotificationModule:', error);
    }
    try {
      MatchingModule,
      console.log('MatchingModule loaded successfully.');
    } catch (error) {
      console.error('Error loading MatchingModule:', error);
    }
    try {
      ProfileModule,
      console.log('ProfileModule loaded successfully.');
    } catch (error) {
      console.error('Error loading ProfileModule:', error);
    }
    try {
      ApplicationModule,
      console.log('ApplicationModule loaded successfully.');
    } catch (error) {
      console.error('Error loading ApplicationModule:', error);
    }
    try {
      UsersModule,
      console.log('UsersModule loaded successfully.');
    } catch (error) {
      console.error('Error loading UsersModule:', error);
    }
    try {
      ReservationModule,
      console.log('ReservationModule loaded successfully.');
    } catch (error) {
      console.error('Error loading ReservationModule:', error);
    }
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
