```typescript
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Profile } from '../profile/profile.entity';
import { Group } from '../group/group.entity';
import { Repository, In, Like } from 'typeorm';
import { Match } from './match.entity';

@Injectable()
export class MatchingService {
  // ... (Existing code)

  async generateExplanation(group: Group): Promise<string> {
    const explanation = `Group ${group.id} was formed based on the following criteria:\n`;
    const members = await this.usersRepository.findByIds(group.members);

    const regions = [...new Set(members.map(member => member.region))];
    const interests = [...new Set(members.flatMap(member => member.interests.split(',')))];


    if (regions.length > 0) {
      const regionsString = regions.map(region => `"${region}"`).join(', ');
      explanation += `- Regions: ${regionsString}\n`;
    }

    if (interests.length > 0) {
      const interestsString = interests.map(interest => `"${interest.trim()}"`).join(', '); // Trim whitespace from interests
      explanation += `- Interests: ${interestsString}\n`;
    }


    // Add other criteria as needed (e.g., skill level, availability, etc.)

    return explanation;


  }

  // ... (Existing code)
}

```