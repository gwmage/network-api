```typescript
import { Body, Controller, Get, Post, Put, Delete, Param, HttpException, HttpStatus, ValidationPipe, Logger } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserData } from './dto/user-data.dto';
import { MatchResultDto } from './dto/match-result.dto';
import { MatchingStatusDto } from './dto/matching-status.dto';

@Controller('matching')
export class MatchingController {
  private readonly logger = new Logger(MatchingController.name);

  constructor(private readonly matchingService: MatchingService) {}

  // ... other methods

  @Get('results/:userId')
  async getMatchingResults(@Param('userId') userId: string): Promise<MatchResultDto> {
    try {
      const matchingResults = await this.matchingService.getMatchingResultsForUser(userId);
      return matchingResults;
    } catch (error) {
      this.logger.error(`Failed to retrieve matching results for user ${userId}: ${error.message}`, error.stack);
      throw new HttpException('Failed to retrieve matching results', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

```