```typescript
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Profile } from '../profile/profile.entity';
import { Group } from '../group/group.entity';
import { Repository, In, Like } from 'typeorm';
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
      relations: ['profile', 'profile.preferences', 'profile.interests'], // Ensure all required relations are loaded
      where: {
        // Add any filtering criteria based on input if needed
        ...(input.region ? { profile: { region: Like(`%${input.region}%`) } } : {}),
      },
    });


    // 2. Prepare data for faster processing and filtering
    const filteredUsers = users.filter(user => user.profile && user.profile.preferences && user.profile.interests).map((user) => ({
      ...user,
      profile: {
        ...user.profile,
        preferences: user.profile.preferences.map(p => p.name), // Simplify preference access
        interests: user.profile.interests.map(i => i.name), // Simplify interest access
      }
    }));

    const matchingGroups: MatchingGroupDto[] = [];
    // ... (Matching logic using filteredUsers and simplified preference/interest access)


    const endTime = performance.now();
    const executionTime = endTime - startTime;
    this.logger.log(`Matching execution time: ${executionTime}ms`);

    return matchingGroups;
  }

  // ... (Other existing code)


}

```