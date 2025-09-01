```typescript
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserMatchingInputDTO } from './dto/user-matching-input.dto';
import { MatchingStatusDto } from './dto/matching-status.dto';


@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post() // No sub-route needed for manual trigger
  async startMatching(): Promise<{ status: string }> {
    await this.matchingService.startMatching(); // No input needed for manual trigger
    return { status: 'Matching process initiated.' };
  }


  @Get('status')
  async getMatchingStatus(): Promise<MatchingStatusDto> {
    return this.matchingService.getMatchingStatus();
  }
}

```