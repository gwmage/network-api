```typescript
import { Body, Controller, Get, Post, Put, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserData } from './dto/user-data.dto';
import { MatchResultDto } from './dto/match-result.dto';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post()
  async initiateMatching() {
    try {
      return await this.matchingService.initiateMatching();
    } catch (error) {
      throw new HttpException('Failed to initiate matching', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('status')
  async getMatchingStatus() {
    try {
      return await this.matchingService.getMatchingStatus();
    } catch (error) {
      throw new HttpException('Failed to get matching status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('users')
  async createUser(@Body() userData: UserData) {
    try {
      return await this.matchingService.createUser(userData);
    } catch (error) {
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @Get('groups')
  async getMatchingGroups(): Promise<MatchResultDto> {
    try {
      const matchingResult = await this.matchingService.findMatch();
      return matchingResult;
    } catch (error) {
        throw new HttpException('Failed to retrieve matching groups', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('notifications') // New endpoint for triggering notifications
  async triggerNotifications() {
    try {
      return await this.matchingService.triggerNotifications();
    } catch (error) {
      throw new HttpException('Failed to trigger notifications', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get('matches')
  async getAllMatches() {
    try {
      return await this.matchingService.getAllMatches();
    } catch (error) {
      throw new HttpException('Failed to get all matches', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('matches/:id')
  async getMatchById(@Param('id') id: string) {
    try {
      return await this.matchingService.getMatchById(id);
    } catch (error) {
      throw new HttpException('Failed to get match', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Put('matches/:id')
  async updateMatch(@Param('id') id: string, @Body() updateData: any) { // Define updateData DTO
    try {
      return await this.matchingService.updateMatch(id, updateData);
    } catch (error) {
      throw new HttpException('Failed to update match', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('matches/:id')
  async deleteMatch(@Param('id') id: string) {
    try {
      return await this.matchingService.deleteMatch(id);
    } catch (error) {
      throw new HttpException('Failed to delete match', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



}

```