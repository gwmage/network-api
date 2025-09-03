import { Controller, Get, Post } from '@nestjs/common';
import { MatchingService } from './matching.service';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post()
  async triggerMatching() {
    return this.matchingService.triggerMatching();
  }

  @Get('status')
  async getMatchingStatus() {
    return this.matchingService.getMatchingStatus();
  }
}
