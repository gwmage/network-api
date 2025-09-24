import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { MatchingGroup } from './entities/matching-group.entity';
import { UserMatch } from './entities/user-match.entity';
import { MatchExplanation } from './entities/match-explanation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, MatchingGroup, UserMatch, MatchExplanation]),
  ],
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}
