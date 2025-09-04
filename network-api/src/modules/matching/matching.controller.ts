```typescript
import { Controller, Post, Body, Get, Param, Query, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserMatchingInputDto } from './dto/user-matching-input.dto';
import { MatchingGroupDto } from './dto/matching-group.dto';
import { MatchingResultsDto } from './dto/matching-results.dto';
import { UserDataDto } from './dto/user-data.dto';
import { MatchingWeightsDto } from './dto/matching-weights.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';


@Controller('matching')
@UseInterceptors(LoggingInterceptor)
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post('generate')
  async generateMatchingResults(
    @Body() input: UserMatchingInputDto,
  ): Promise<MatchingResultsDto> {
    return this.matchingService.generateMatchingResults(input);
  }

  @Post('find')
  async findMatches(@Body() userData: UserDataDto[]): Promise<MatchingGroupDto[]> {
    return this.matchingService.findMatches(userData);
  }

  @Get('user-data')
  async getUserData(@Query('userIds') userIds?: number[]): Promise<UserDataDto[]> {
    return this.matchingService.getUserData(userIds);
  }


  @Post('results')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async storeMatchingResults(@Body() results: MatchingResultsDto): Promise<void> {
    return this.matchingService.storeMatchingResults(results);
  }


  @Get('results')
  async retrieveMatchingResults(@Query('userId') userId?: number): Promise<MatchingResultsDto> {
    return this.matchingService.retrieveMatchingResults(userId);
  }

  @Put('weights')
  updateMatchingWeights(@Body() weights: MatchingWeightsDto): void {
    this.matchingService.updateMatchingWeights(weights);
  }

  @Post('performance-test')
  async runPerformanceTests(): Promise<void> {
    return this.matchingService.runPerformanceTests();
  }
}
```