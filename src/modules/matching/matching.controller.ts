```typescript
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserMatchingInputDTO } from './dto/user-matching-input.dto';
import { MatchingResultsDto } from './dto/matching-results.dto';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post()
  async initiateMatching(@Body(new ValidationPipe()) userInput: UserMatchingInputDTO): Promise<MatchingResultsDto> {
    try {
      const matchingResult = await this.matchingService.initiateMatching(userInput);
      return matchingResult;
    } catch (error) {
      console.error('Error initiating matching:', error);
      throw error; // Re-throw the error to be handled by the global exception filter
    }
  }


  @Post('run')
  async runMatching(@Body(new ValidationPipe()) criteria: any): Promise<MatchingResultsDto> { // Update type if needed
    try {
      const matchingResult = await this.matchingService.runMatching(criteria);
      return matchingResult;
    } catch (error) {
      console.error('Error running matching with criteria:', error);
      throw error;
    }
  }
}

```