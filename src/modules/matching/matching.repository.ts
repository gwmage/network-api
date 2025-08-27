```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { MatchingGroup } from './entities/matching-group.entity';
import { UserMatch } from './entities/user-match.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MatchingRepository {
  constructor(
    @InjectRepository(MatchingGroup)
    private readonly matchingGroupRepository: Repository<MatchingGroup>,
    @InjectRepository(UserMatch)
    private readonly userMatchRepository: Repository<UserMatch>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ... other methods

  async findUserMatchesByRegionsAndInterests(regions: string[], interests: string[]): Promise<UserMatch[]> {
    return this.userMatchRepository.find({
      where: {
        user: {
          region: In(regions),
          interests: In(interests),
        },
      },
      relations: ['user'],
    });
  }

  async findMatchingGroupsByRegionsAndInterests(regions: string[], interests: string[]): Promise<MatchingGroup[]> {
    const userMatches = await this.findUserMatchesByRegionsAndInterests(regions, interests);
    const groupIds = userMatches.map((match) => match.groupId);
    return this.matchingGroupRepository.find({
      where: {
        id: In(groupIds),
      },
    });
  }
}

```