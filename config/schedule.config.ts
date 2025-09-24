import { Cron, Timeout } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { MatchingService } from 'src/modules/matching/matching.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private matchingService: MatchingService) {}

  @Cron('0 0 * * 0') 
  async handleCron() {
    this.logger.debug('Running weekly matching algorithm...');
    try {
      await this.matchingService.runMatching(); 
      this.logger.debug('Matching algorithm completed successfully.');
    } catch (error) {
      this.logger.error(`Error running matching algorithm: ${error}`);
    }
  }
}
