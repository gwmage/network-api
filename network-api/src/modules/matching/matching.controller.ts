import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserMatchingInputDto } from './dto/user-matching-input.dto';
import { MatchingGroupDto } from './dto/matching-group.dto';
import { MatchingResultsDto } from './dto/matching-results.dto';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post('generate')
  async generateMatchingResults(
    @Body() input: UserMatchingInputDto,
  ): Promise<MatchingResultsDto> {
    return this.matchingService.generateMatchingResults(input);
  }

  @Get('results')
  async retrieveMatchingResults(@Query('userId') userId?: number): Promise<MatchingResultsDto> {
    return this.matchingService.retrieveMatchingResults(userId);
  }
}