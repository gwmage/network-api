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
    const users = await this.usersRepository.find({
      where: input.criteria, // Use criteria directly in query
      relations: ['profile'] // Eager load profile for better performance
    });


    const groups: MatchingGroupDto[] = [];
    let currentGroup: MatchingGroupDto = { groupId: 1, matchingScore: 0, participants: [] };
    let groupCount = 1;

    // Simple grouping logic (replace with your AI algorithm)
    for (const user of users) {
      if (currentGroup.participants.length < 5) { //Limit to 5
        currentGroup.participants.push({ userId: user.id });
      } else {
        groups.push(currentGroup);
        groupCount++;
        currentGroup = { groupId: groupCount, matchingScore: 0, participants: [{ userId: user.id }] };
      }
    }
    groups.push(currentGroup); // Add the last group

    return groups;
  }


  async generateExplanation(group: Group): Promise<string> {
    // ... (Existing code)
  }

  // ... (Existing code)
}
```