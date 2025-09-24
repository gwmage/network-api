import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MatchingService } from '@modules/matching/matching.service';

@Injectable()
export class ScheduleService {
  constructor(private matchingService: MatchingService) {}

  @Cron('0 0 * * *')
  async handleCron() {
    // Run matching algorithm every day at midnight
    console.log('Running matching algorithm...');
    await this.matchingService.generateMatchingResults();
    console.log('Matching algorithm completed.');
  }
}
