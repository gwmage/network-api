```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository, In } from 'typeorm';
import { Match } from './entities/match.entity';
import { NotificationService } from '../notifications/notification.service';
import { PerformanceObserver, performance } from 'perf_hooks';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private notificationService: NotificationService,
  ) {}

  async triggerMatching(): Promise<{ status: string }> {
    // ... (no changes)
  }

  async getMatchingStatus(): Promise<{ status: string }> {
    // ... (no changes)
  }


  @Cron(CronExpression.EVERY_WEEK)
  async runMatching() {
    // ... (no changes in performance monitoring setup)

    this.logger.log('Starting AI matching process...');
    try {
      performance.mark('matchingStart');

      // Optimized User Fetching with necessary relations and filtering
      const users = await this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.preferences', 'preferences')
        .leftJoinAndSelect('user.interests', 'interests')
        .where(
          // Example filtering based on active users or other criteria
          'user.isActive = :isActive', { isActive: true }
        )
        .getMany();


      if (!users || users.length === 0) {
        this.logger.warn('No users found for matching.');
        return;
      }
      performance.mark('usersFetched');
      performance.measure('Fetch Users', 'matchingStart', 'usersFetched');

      const matchedGroups = this.matchUsers(users);
      performance.mark('matchingComplete');
      performance.measure('Matching Algorithm', 'usersFetched', 'matchingComplete');

      // Optimized Saving using batched inserts
      const matchesToSave = matchedGroups.flatMap(group => this.createMatchEntities(group));
      const savedMatches = await this.matchRepository.save(matchesToSave, { chunk: 500 }); // Adjust chunk size as needed

      performance.mark('matchesSaved');
      performance.measure('Save Matches', 'matchingComplete', 'matchesSaved');

      await this.sendMatchNotifications(savedMatches);
      // ... (rest of the performance measurements and logging)
    } catch (error) {
        // ... error handling
    } finally {
        // ... cleanup
    }
  }

  private createMatchEntities(group: User[]): Match[] {
    const matches: Match[] = [];
    for (const user of group) {
        matches.push(this.matchRepository.create({ users: group }));
    }
    return matches;
}


  private calculateMetrics(users: User[], matchedGroups: User[][]): { precision: number, recall: number, f1Score: number } {
    // ... (Placeholder implementation - Needs actual metric calculation logic)
  }

  private async sendMatchNotifications(matches: Match[]): Promise<void> {
      // ... existing code
  }


  private matchUsers(users: User[]): User[][] {
    const matchedGroups: User[][] = [];
    // ... (Your matching algorithm logic here)

    // Example: Group users based on interests (replace with your actual algorithm)
    const interestMap: { [interest: string]: User[] } = {};
    users.forEach(user => {
      user.interests.forEach(interest => {
        if (!interestMap[interest.name]) {
          interestMap[interest.name] = [];
        }
        interestMap[interest.name].push(user);
      });
    });

    for (const interest in interestMap) {
      const groupSize = this.getGroupSize(); // Dynamic group size
      for (let i = 0; i < interestMap[interest].length; i += groupSize) {
        matchedGroups.push(interestMap[interest].slice(i, i + groupSize));
      }
    }

    return matchedGroups;
  }



  private getGroupSize(): number {
    // ... (Logic to determine optimal group size dynamically)
  }
}

```