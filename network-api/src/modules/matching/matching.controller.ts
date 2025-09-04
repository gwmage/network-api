import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserMatchingInputDto } from './dto/user-matching-input.dto';
import { MatchingGroupDto } from './dto/matching-group.dto';
import { MatchingResultsDto } from './dto/matching-results.dto';
import { UserDataDto } from './dto/user-data.dto';
import { MatchingWeightsDto } from './dto/matching-weights.dto';


@Controller('matching')
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