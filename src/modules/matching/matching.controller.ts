import { Controller, Get } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingStatusDto } from './dto/matching-status.dto';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Get('status')
  async getStatus(): Promise<MatchingStatusDto> {
    return await this.matchingService.getStatus();
  }
}
