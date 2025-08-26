```typescript
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Profile } from '../profile/profile.entity';
import { Group } from '../group/group.entity';
import { Repository, In, Like, SelectQueryBuilder } from 'typeorm';
import { Match } from './match.entity';
import { UserMatchingInputDTO } from './dto/user-matching-input.dto';
import { MatchingGroupDto } from './dto/matching-group.dto';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Match) private matchRepository: Repository<Match>,
  ) {}

  async runMatching(input: UserMatchingInputDTO): Promise<MatchingGroupDto[]> {
    const startTime = performance.now();

    // 1. Fetch user profiles with eager loading for related entities
    const users = await this.userRepository.find({
      relations: ['profile'],
      where: {
        // Add any filtering criteria based on input if needed
      },
    });

    //  2. Prepare data for faster processing
    const userProfiles = users.map((user) => user.profile);

    // ... (Existing matching logic using userProfiles instead of fetching data inside the loop)

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    this.logger.log(`Matching execution time: ${executionTime}ms`);

    return matchingGroups;
  }


  async generateExplanation(groupId: number): Promise<string> {
    // ... existing code
  }

  // ... (Other existing code)

  private async buildMatchingQuery(): Promise<SelectQueryBuilder<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
      return queryBuilder
          .leftJoinAndSelect('user.profile', 'profile'); // Optimized join
  }


}

```