```typescript
import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserMatch } from './entities/user-match.entity';
import { MatchExplanation } from './entities/match-explanation.entity';
import { MatchingGroup } from './entities/matching-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserMatch, MatchExplanation, MatchingGroup])],
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}

```