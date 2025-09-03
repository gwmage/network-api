```typescript
import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Community, Post, Comment]), UsersModule],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}

```