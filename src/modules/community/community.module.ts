import { Module, forwardRef } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Community } from './entities/community.entity';
import { CommunityRepository } from './community.repository';
import { UsersModule } from '../users/users.module';
import { NotificationModule } from '../notification/notification.module';
import { Category } from './entities/category.entity';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Community, Post, Comment, Category, Tag]), UsersModule, forwardRef(() => NotificationModule)],
  controllers: [CommunityController],
  providers: [CommunityService, CommunityRepository],
  exports: [CommunityService]
})
export class CommunityModule {}
