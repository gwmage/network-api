```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { MatchingGroup } from './entities/matching-group.entity';
import { UserMatch } from './entities/user-match.entity';

@Injectable()
export class MatchingRepository {
  constructor(
    @InjectRepository(MatchingGroup)
    private readonly matchingGroupRepository: Repository<MatchingGroup>,
    @InjectRepository(UserMatch)
    private readonly userMatchRepository: Repository<UserMatch>,
  ) {}

  async createMatchingGroup(matchingGroup: MatchingGroup): Promise<MatchingGroup> {
    return this.matchingGroupRepository.save(matchingGroup);
  }

  async createUserMatch(userMatch: UserMatch): Promise<UserMatch> {
    return this.userMatchRepository.save(userMatch);
  }

  async findMatchingGroup(where: FindOptionsWhere<MatchingGroup>): Promise<MatchingGroup | null> {
    return this.matchingGroupRepository.findOne({ where });
  }

  async findUserMatch(where: FindOptionsWhere<UserMatch>): Promise<UserMatch | null> {
    return this.userMatchRepository.findOne({ where });
  }

  async findMatchingGroups(where: FindOptionsWhere<MatchingGroup>): Promise<MatchingGroup[]> {
    return this.matchingGroupRepository.find({ where });
  }

  async findUserMatches(where: FindOptionsWhere<UserMatch>): Promise<UserMatch[]> {
    return this.userMatchRepository.find({ where });
  }
}
```