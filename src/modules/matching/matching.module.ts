import { Module, forwardRef } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserMatch } from './entities/user-match.entity';
import { MatchExplanation } from './entities/match-explanation.entity';
import { MatchingGroup } from './entities/matching-group.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserMatch, MatchExplanation, MatchingGroup]), forwardRef(() => UsersModule)],
  controllers: [MatchingController],
  providers: [MatchingService],
})
export class MatchingModule {}
