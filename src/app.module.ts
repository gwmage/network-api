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
import { Admin } from './modules/admin/entities/admin.entity';
import { Application } from './modules/application/entities/application.entity';
import { Post } from './modules/community/entities/post.entity';
import { Comment } from './modules/community/entities/comment.entity';
import { Category } from './modules/community/entities/category.entity';
import { Tag } from './modules/community/entities/tag.entity';
import { MatchingGroup } from './modules/matching/entities/matching-group.entity';
import { MatchExplanation } from './modules/matching/entities/match-explanation.entity';
import { UserMatch } from './modules/matching/entities/user-match.entity';
import { Profile } from './modules/profile/entities/profile.entity';
import { Reservation } from './modules/reservation/entities/reservation.entity';
import { NotificationDeliveryStatus } from './modules/notification/entities/notification-delivery-status.entity';


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
        entities: [
          User, Notification, NotificationPreferences, Admin, Application, Post, Comment, Category, Tag, MatchingGroup, MatchExplanation, UserMatch, Profile, Reservation, NotificationDeliveryStatus
        ],  // Explicitly list entities
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
