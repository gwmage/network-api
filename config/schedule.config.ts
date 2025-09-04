import { Cron, Timeout } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { MatchingService } from '../network-api/src/modules/matching/matching.service'; // Adjust path as needed

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private matchingService: MatchingService) {}

  @Cron('0 0 * * 0') // Run every Sunday at 00:00 (midnight) - Adjust cron expression as needed
  async handleCron() {
    this.logger.debug('Running weekly matching algorithm...');
    try {
      await this.matchingService.runMatching(); // Call the matching service
      this.logger.debug('Matching algorithm completed successfully.');
    } catch (error) {
      this.logger.error(`Error running matching algorithm: ${error}`);
    }
  }
}