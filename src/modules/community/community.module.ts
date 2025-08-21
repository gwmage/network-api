```typescript
import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Community } from './entities/community.entity';
import { CommunityRepository } from './community.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Community, Post, Comment])],
  controllers: [CommunityController],
  providers: [CommunityService, CommunityRepository],
})
export class CommunityModule {}

```