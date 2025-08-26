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


@Controller('admin/matches') // Added /admin prefix for future permission management
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  // ... existing code ...

  @Post('matching')
  async initiateMatching(@Body(new ValidationPipe()) userInput: UserMatchingInputDTO): Promise<MatchingResultsDto> {
    try {
      const matchingResult = await this.matchingService.initiateMatching(userInput);
      return matchingResult;
    } catch (error) {
      console.error('Error initiating matching:', error);
      throw error; // Re-throw the error to be handled by the global exception filter
    }
  }

  // ... existing code ...

}
```