import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/auth/entities/user.entity';
import { CommunityModule } from './modules/community/community.module';
import { ApplicationModule } from './modules/application/application.module';
import { Community } from './modules/community/entities/community.entity';
import { Post } from './modules/community/entities/post.entity';
import { Comment } from './modules/community/entities/comment.entity';
import { MatchingModule } from './modules/matching/matching.module';
import { MatchingGroup } from './modules/matching/entities/matching-group.entity';
import { MatchExplanation } from './modules/matching/entities/match-explanation.entity';
import { Application } from './modules/application/entities/application.entity';
import { NotificationModule } from './modules/notification/notification.module'; // Import NotificationModule
import { UserNotificationPreferences } from './modules/notification/entities/user-notification-preferences.entity';
import { NotificationDeliveryStatus } from './modules/notification/entities/notification-delivery-status.entity';

@Module({
  imports: [
    // ... other imports
    NotificationModule, // Add NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}