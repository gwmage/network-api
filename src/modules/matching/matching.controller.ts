```typescript
import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Query, Res, ValidationPipe } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserData } from './dto/user-data.dto';
import { MatchResultDto } from './dto/match-result.dto';
import { MatchDto } from './dto/match.dto';
import { MatchFilterDto } from './dto/match-filter.dto';
import { UserMatchingInputDTO } from './dto/user-matching-input.dto';
import { MatchingResultsDto } from './dto/matching-results.dto'; // Import the correct DTO
import { Response } from 'express';


@Controller('api/matching') // Updated base path
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  // ... existing code ...

  @Get('groups/:groupId/explanation')
  async getExplanation(@Param('groupId', ParseIntPipe) groupId: number): Promise<string> {
    return this.matchingService.getExplanation(groupId);
  }

  // ... existing code ...
}
```