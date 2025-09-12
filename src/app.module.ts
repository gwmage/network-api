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
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        logging: ['error', 'warn', 'log'],
        keepConnectionAlive: true,
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
