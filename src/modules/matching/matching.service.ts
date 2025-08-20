```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  @Cron(CronExpression.EVERY_WEEK) // Run every week
  async runMatching() {
    this.logger.log('Starting AI matching process...');

    try {
      const users = await this.userRepository.find({
        where: {  // Add any necessary filtering criteria here. For example, users actively seeking matches
          // isActive: true, 
        },
      });

      const matchedGroups = this.matchUsers(users);

      await this.saveMatches(matchedGroups);

      this.logger.log('Matching process completed successfully.');
    } catch (error) {
      this.logger.error(`Matching process failed: ${error.message}`, error.stack);
    }
  }


  private matchUsers(users: User[]): User[][] {
    // Implement AI matching logic here based on weighting criteria (location, preferences, interests)
    // This is a placeholder and should be replaced with the actual algorithm.
    const matchedGroups: User[][] = [];

    // Example: Simple grouping by location (replace with your actual algorithm)
    const usersByLocation = users.reduce((acc, user) => {
      const location = user.location || 'unknown'; // Use a default location if not available
      acc[location] = acc[location] || [];
      acc[location].push(user);
      return acc;
    }, {} as Record<string, User[]>);


    for (const location in usersByLocation) {
      const usersInLocation = usersByLocation[location];
      // Divide users into groups of 5 (or adjust as needed)
      for (let i = 0; i < usersInLocation.length; i += 5) {
        matchedGroups.push(usersInLocation.slice(i, i + 5));
      }
    }

    return matchedGroups;

  }

  private async saveMatches(matchedGroups: User[][]) {
    for (const group of matchedGroups) {
      const match = new Match();
      match.users = group;
      // ... any other relevant properties for the Match entity
      await this.matchRepository.save(match);
    }
  }
}

```