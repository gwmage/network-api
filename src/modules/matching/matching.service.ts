```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { NotificationService } from '../notifications/notification.service'; // Import NotificationService

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private notificationService: NotificationService, // Inject NotificationService
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

      const savedMatches = await this.saveMatches(matchedGroups);

      // Send notifications after successful match and save
      await this.sendMatchNotifications(savedMatches);


      this.logger.log('Matching process completed successfully.');
    } catch (error) {
      this.logger.error(`Matching process failed: ${error.message}`, error.stack);
    }
  }

  // ... other methods

  private async saveMatches(matchedGroups: { score: number, participants: { userId: number, name: string }[] }[]): Promise<Match[]> {
    const savedMatches: Match[] = [];
    for (const group of matchedGroups) {
      const match = new Match();
      match.users = group.participants.map(p => ({ id: p.userId } as User)); // Assuming User entity has an 'id' field
      // ... any other relevant properties for the Match entity, potentially including score
      const savedMatch = await this.matchRepository.save(match);
      savedMatches.push(savedMatch);
    }
    return savedMatches;
  }

  private async sendMatchNotifications(matches: Match[]): Promise<void> {
    for (const match of matches) {
      for (const user of match.users) {
        // Call the notification service to create and save notification for each user
        await this.notificationService.createMatchNotification(user, match);
      }
    }
  }
}

```