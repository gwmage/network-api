/* Placeholder for schedule config - needs more context on where the matching logic resides.  Assuming matching logic is in MatchingService. */
import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { MatchingService } from '../src/modules/matching/matching.service'; // Import MatchingService

@Injectable()
export class ScheduleService {
  constructor(private matchingService: MatchingService) {}

  @Cron('0 0 * * 0') // Every Sunday at midnight
  async handleCron() {
    // Call matching service
     await this.matchingService.triggerMatching();
  }
}