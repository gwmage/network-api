import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMatch } from './entities/user-match.entity';
import { MatchingGroup } from './entities/matching-group.entity';
import { MatchExplanation } from './entities/match-explanation.entity';
import { UserInputDto } from './dto/user-input.dto';
import { UserMatchingInputDto } from './dto/user-matching-input.dto';
import { MatchingGroupDto } from './dto/matching-group.dto';
import { MatchingResultsDto } from './dto/matching-results.dto';
import { ParticipantDto } from './dto/participant.dto';
import { MatchNotificationDataDto } from '../notification/dto/match-notification-data.dto';
import { NotificationService } from '../notification/notification.service';
import { NotificationEvent } from '../notification/dto/notification-event.enum';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(
    @InjectRepository(UserMatch)
    private userMatchRepository: Repository<UserMatch>,
    @InjectRepository(MatchingGroup)
    private matchingGroupRepository: Repository<MatchingGroup>,
    @InjectRepository(MatchExplanation)
    private matchExplanationRepository: Repository<MatchExplanation>,
    private notificationService: NotificationService,
  ) {}

  async generateMatchingResults(
    input: UserInputDto,
  ): Promise<MatchingResultsDto> {
    const startTime = Date.now();
    // ... (Your existing matching logic) ...

    const executionTime = Date.now() - startTime;
    this.logger.log(`Matching execution time: ${executionTime}ms`);

    return {
      groups: [], // Replace with actual group data
      explanations: [], // Replace with actual explanation data
    };
  }

  async sendMatchNotification(
    userId: string,
    input: MatchNotificationDataDto,
    user: any, // Add user object
  ): Promise<void> {
    try {
      const notificationType = user.profile.preferences.notificationType || 'push';
      const notificationMessage = `You have a new match in ${input.region || 'your area'}!`;
      await this.notificationService.sendNotification(
        userId,
        notificationMessage,
        notificationType,
        NotificationEvent.MATCH_FOUND,
        input,
      );
    } catch (error) {
      this.logger.error(`Failed to send notifications: ${error.message}`);
    }
  }

  // ... (Other methods in your service) ...
}
