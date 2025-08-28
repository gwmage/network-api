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

  @Post()
  async initiateMatching(@Body(new ValidationPipe()) userData: UserData): Promise<{ message: string }> {
    try {
      await this.matchingService.initiateMatching(userData);
      return { message: 'Matching initiated successfully' };
    } catch (error) {
      this.logger.error(`Failed to initiate matching: ${error.message}`, error.stack);
      throw new HttpException('Failed to initiate matching', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('status')
  async getMatchingStatus(): Promise<MatchingStatusDto> {
    try {
      return await this.matchingService.getMatchingStatus();
    } catch (error) {
      this.logger.error(`Failed to get matching status: ${error.message}`, error.stack);
      throw new HttpException('Failed to get matching status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('users')
  async createUser(@Body(new ValidationPipe()) userData: UserData): Promise<UserData> {
    try {
      return await this.matchingService.createUser(userData);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @Get('groups')
  async getMatchingGroups(): Promise<MatchResultDto> {
    try {
      const matchingResult = await this.matchingService.findMatch();
      return matchingResult;
    } catch (error) {
      this.logger.error(`Failed to retrieve matching groups: ${error.message}`, error.stack);
        throw new HttpException('Failed to retrieve matching groups', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('matches')
  async getAllMatches()  {
    try {
      return await this.matchingService.getAllMatches();
    } catch (error) {
      this.logger.error(`Failed to get all matches: ${error.message}`, error.stack);
      throw new HttpException('Failed to get all matches', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('matches/:id')
  async getMatchById(@Param('id') id: string) {
    try {
      return await this.matchingService.getMatchById(id);
    } catch (error) {
      this.logger.error(`Failed to get match: ${error.message}`, error.stack);
      throw new HttpException('Failed to get match', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Put('matches/:id')
  async updateMatch(@Param('id') id: string, @Body() updateData: any) { // Define updateData DTO
    try {
      return await this.matchingService.updateMatch(id, updateData);
    } catch (error) {
      this.logger.error(`Failed to update match: ${error.message}`, error.stack);
      throw new HttpException('Failed to update match', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('matches/:id')
  async deleteMatch(@Param('id') id: string) {
    try {
      return await this.matchingService.deleteMatch(id);
    } catch (error) {
      this.logger.error(`Failed to delete match: ${error.message}`, error.stack);
      throw new HttpException('Failed to delete match', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



}
```