import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { ApplicationModule } from './modules/application/application.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CommunityModule } from './modules/community/community.module';
import { MatchingModule } from './modules/matching/matching.module';
import { NotificationModule } from './modules/notification/notification.module';
import { NotificationPreferences } from './modules/notification/entities/notification-preferences.entity';
import { Notification } from './modules/notification/entities/notification.entity';
import { ProfileModule } from './modules/profile/profile.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { User } from './modules/users/entities/user.entity'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Notification, NotificationPreferences],  // Explicitly list entities
        synchronize: true, // Consider setting this to false in production
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