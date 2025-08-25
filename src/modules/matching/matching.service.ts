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
    // ... (Existing code)
  }

  async generateExplanation(groupId: number): Promise<string> {
    // Fetch the group and its participants (replace with your actual data fetching logic)
    const group = await this.groupRepository.findOne({ where: { id: groupId }, relations: ['participants'] });
    if (!group) {
      return "Group not found.";
    }

    const userIds = group.participants.map(p => p.userId);
    const users = await this.usersRepository.findByIds(userIds);

    let explanation = `Group ${groupId} Explanation:\n`;
    explanation += `This group was formed based on the following criteria:\n`;

    // Example criteria (replace with your actual matching criteria)
    const criteria = ['interests', 'location', 'skills'];

    criteria.forEach(criterion => {
      const values = users.map(user => user[criterion]).filter(value => value !== null && value !== undefined);
      if (values.length > 0) {
        const uniqueValues = [...new Set(values)];
        explanation += `- ${criterion}: ${uniqueValues.join(', ')}\n`;
      }
    });


    return explanation;
  }


  // ... (Existing code)
}

```