import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor() {
    this.logger.log('MatchingService initialized');
  }

import { Injectable } from '@nestjs/common';
import { MatchingStatusDto } from './dto/matching-status.dto';

@Injectable()
export class MatchingService {
  private matchingStatus: MatchingStatusDto = {
    status: 'pending',
    startTime: new Date(),
  };

  constructor() {
    console.log("MatchingService constructor called");
    console.error(this.matchingStatus); // Log the matchingStatus object to see its state
  }

  // ... rest of the MatchingService code
}
