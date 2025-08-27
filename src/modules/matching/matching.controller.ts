```typescript
import { Body, Controller, Get, Post, Put, Delete, Param, HttpException, HttpStatus, ValidationPipe, Query } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserData } from './dto/user-data.dto';
import { MatchResultDto } from './dto/match-result.dto';
import { MatchingStatusDto } from './dto/matching-status.dto';
import { MatchFilterDto } from './dto/match-filter.dto';


@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  // ... other methods

  @Get('filtered-matches')
  async getFilteredMatches(@Query() filter: MatchFilterDto): Promise<MatchResultDto> {
    try {
      const matchingResult = await this.matchingService.findMatch(filter);
      return matchingResult;
    } catch (error) {
      throw new HttpException('Failed to retrieve filtered matches', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}

```