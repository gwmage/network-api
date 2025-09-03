import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserMatch } from './entities/user-match.entity';
import { MatchingRequestDto } from './dto/matching-request.dto';
import { MatchingResultsDto, ParticipantDto } from './dto/matching-results.dto';
import { User } from '../users/entities/user.entity';
import { MatchingGroup } from './entities/matching-group.entity';
import { MatchExpansion } from './entities/match-expansion.entity';
import { UserMatchingInput } from './dto/user-matching-input.dto';
import { Cron } from '@nestjs/schedule';
import { NotificationService } from '../notification/notification.service';
import { NotificationEvent } from '../notification/dto/notification-event.enum';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(
    @InjectRepository(UserMatch)
    private userMatchRepository: Repository<UserMatch>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(MatchingGroup)
    private matchingGroupRepository: Repository<MatchingGroup>,
    @InjectRepository(MatchExpansion)
    private matchExpansionRepository: Repository<MatchExpansion>,
    private notificationService: NotificationService
  ) {}

  @Cron('0 0 * * *') // Run every day at midnight
  async runMatching() {
    const startTime = Date.now();
    const allUsers = await this.userRepository.find();
    const userMatches = await this.userMatchRepository.find();

    for (const user of allUsers) {
      const input: UserMatchingInput = {
        userId: user.id,
        region: user.region,
        interests: user.interests
      };
      await this.findMatches(input);
    }

    const executionTime = Date.now() - startTime;
    this.logger.log(`Matching execution time: ${executionTime}ms`);
  }


  async findMatches(input: UserMatchingInput): Promise<MatchingResultsDto[]> {
    const { userId, region, interests } = input;

    const user = await this.userRepository.findOne({where: { id: userId }});
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const notificationType = user.notificationPreferences.notificationType || 'push'; // Default to 'push' if not set
    const notificationMessage = `You have a new match in ${input.region || 'your area'}!`;

    try {

      await this.notificationService.sendNotification(user.id, notificationMessage, notificationType);

    } catch (error) {
      this.logger.error(`Failed to send notifications: ${error.message}`);
    }

    return []; // Placeholder return. Replace with actual matching logic and results.
  }
}
