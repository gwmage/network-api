import { Injectable, Logger } from '@nestjs/common';
import { MatchingStatusDto } from './dto/matching-status.dto';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);
  private matchingStatus: MatchingStatusDto = {
    status: 'pending',
    startTime: new Date(),
  };

  constructor() {
    this.logger.log('MatchingService initialized');
    console.error(this.matchingStatus);
  }

  async generateMatchingResults(): Promise<void> {
    // Add your matching logic here
    this.logger.log('Generating matching results...');
  }

  // ... rest of the MatchingService code
}