import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { ApplicationModule } from './modules/application/application.module';
import { CommunityModule } from './modules/community/community.module';
import { NotificationModule } from './modules/notification/notification.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MatchingModule } from './modules/matching/matching.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './modules/email/email.module';
import { User } from './modules/users/entities/user.entity';
import { ProfileEntity } from './modules/profile/entities/profile.entity';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, ProfileEntity],
        synchronize: true, // Be cautious with this in production
      }),
    }),
    UsersModule,
    ReservationModule,
    AuthModule,
    AdminModule,
    ApplicationModule,
    CommunityModule,
    NotificationModule,
    ProfileModule,
    MatchingModule,
    EmailModule,
    RestaurantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}