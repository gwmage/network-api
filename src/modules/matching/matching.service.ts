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

    const queryBuilder = this.buildMatchingQuery(input);
    const users = await queryBuilder.getMany();


    // Prepare data for faster processing
    const userProfiles = users.map((user) => user.profile);

    // ... (Existing matching logic using userProfiles)

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    this.logger.log(`Matching execution time: ${executionTime}ms`);

    return matchingGroups; // Make sure matchingGroups is properly defined in the existing logic
  }

  // ... (Other existing code)

  private buildMatchingQuery(input: UserMatchingInputDTO): SelectQueryBuilder<User> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.leftJoinAndSelect('user.profile', 'profile');

    // Apply filtering based on input
    if (input.location) {
      queryBuilder.andWhere('profile.location LIKE :location', { location: `%${input.location}%` });
    }
    if (input.interests) {
      queryBuilder.andWhere('profile.interests && :interests', { interests: input.interests }); // Assuming interests is an array
    }
    // ... add other filters based on input fields and your data structure

    return queryBuilder;
  }


  async generateExplanation(groupId: number): Promise<string> {
    // ... existing code
  }
}

```