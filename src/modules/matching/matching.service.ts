import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserMatch } from './entities/user-match.entity';
import { MatchingRequestDto } from './dto/matching-request.dto';
import { MatchingResultsDto, ParticipantDto } from './dto/matching-results.dto';
import { User } from '../users/entities/user.entity';
import { MatchingGroup } from './entities/matching-group.entity';
import { MatchExpansion } from './entities/match-expansion.entity';
import { UserMatchingInputDTO } from './dto/user-matching-input.dto';
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
    //const userMatches = await this.userMatchRepository.find(); // Not used

    for (const user of allUsers) {
      const input: UserMatchingInputDTO = {
        region: user.region,
        preferences: user.preferences, // Accessing user properties directly
        interests: user.interests
      };
      await this.findMatches(input);
    }

    const executionTime = Date.now() - startTime;
    this.logger.log(`Matching execution time: ${executionTime}ms`);
  }


  async findMatches(input: UserMatchingInputDTO): Promise<MatchingResultsDto[]> {
    const { region, preferences, interests } = input; // Correctly destructure input

    // Example usage of input properties: 
    console.log('Region:', region);
    console.log('Preferences:', preferences);
    console.log('Interests:', interests);

     // Access user based on context, if needed 
    // const userId = ...; // Get userId from appropriate context
    // const user = await this.userRepository.findOne({where: { id: userId }});


    // Example notification (adapt as needed)
    const notificationType = 'push'; // Replace with user preference lookup
    const notificationMessage = `You have a new match in ${region || 'your area'}!`;

    try {
      // Replace with actual user ID for notification
      // await this.notificationService.sendNotification(userId, notificationMessage, notificationType);
    } catch (error) {
      this.logger.error(`Failed to send notifications: ${error.message}`);
    }

    return []; // Placeholder return. Replace with actual matching logic and results.
  }
}
