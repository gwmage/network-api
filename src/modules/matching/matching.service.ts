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
  // ... (Existing code)

  async runMatching(input: UserMatchingInputDTO): Promise<MatchingGroupDto[]> {
    const startTime = performance.now();
    // ... (Existing matching logic)

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    this.logger.log(`Matching execution time: ${executionTime}ms`);

    return matchingGroups;
  }


  async generateExplanation(groupId: number): Promise<string> {
    // ... existing code
  }

  // ... (Existing code)
}

```