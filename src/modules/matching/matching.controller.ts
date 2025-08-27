```typescript
import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchResultDto } from './dto/match-result.dto';

@Controller('user/matches')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Get(':userId')
  async getMatchingResultsForUser(@Param('userId') userId: number): Promise<MatchResultDto[]> {
    try {
      const matchingResults = await this.matchingService.getMatchingResultsForUser(userId);
      return matchingResults;
    } catch (error) {
      throw new HttpException('Failed to retrieve matching results for user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
```