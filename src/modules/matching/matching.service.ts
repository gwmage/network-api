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
import { NotificationService } from '../notifications/notification.service'; // Import NotificationService

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    private readonly notificationService: NotificationService, // Inject NotificationService
  ) {}

  async runMatching(input: UserMatchingInputDTO): Promise<MatchingGroupDto[]> {
    const startTime = performance.now();

    // ... (Existing matching logic)

    const matchingGroups: MatchingGroupDto[] = [];
    // ... (Matching logic)

    try {
      for (const group of matchingGroups) {
        for (const user of group.users) {
          const notificationType = user.profile.preferences.notificationType || 'push'; // Default to 'push' if not set
          const notificationMessage = `You have a new match in ${input.region || 'your area'}!`;
          await this.notificationService.sendNotification(user.id, notificationMessage, notificationType);
        }
      }
    } catch (error) {
      this.logger.error(`Failed to send notifications: ${error.message}`);
      // Handle error appropriately, e.g., retry, log, or store for later processing
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    this.logger.log(`Matching execution time: ${executionTime}ms`);

    return matchingGroups;
  }

  // ... (Other existing code)

}
```