import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommunityModule } from './modules/community/community.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ApplicationModule } from './modules/application/application.module';
import { UsersModule } from './modules/users/users.module';
import { NotificationModule } from './modules/notification/notification.module';
import { MatchingModule } from './modules/matching/matching.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { ScheduleModule } from '@nestjs/schedule';
import { config } from 'dotenv';

config();

console.log("DATABASE_URL from app.module.ts:", process.env.DATABASE_URL);
console.log("TYPEORM_URL from app.module.ts:", process.env.TYPEORM_URL);
console.log("TYPEORM_CONNECTION from app.module.ts:", process.env.TYPEORM_CONNECTION);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.railway.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || process.env.TYPEORM_URL || process.env.TYPEORM_CONNECTION,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Only disable SSL verification in production
    }),
    ScheduleModule.forRoot(),
    AdminModule,
    AuthModule,
    CommunityModule,
    ProfileModule,
    ApplicationModule,
    UsersModule,
    NotificationModule,
    MatchingModule,
    ReservationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
