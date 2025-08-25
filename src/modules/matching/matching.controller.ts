```typescript
import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserData } from './dto/user-data.dto';
import { MatchResultDto } from './dto/match-result.dto';
import { MatchDto } from './dto/match.dto';

@Controller('admin/matches') // Added /admin prefix for future permission management
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post()
  async createMatch(@Body() matchData: MatchDto): Promise<MatchDto> {
    return this.matchingService.createMatch(matchData);
  }

  @Get()
  async getAllMatches(): Promise<MatchDto[]> {
    return this.matchingService.getAllMatches();
  }

  @Get(':id')
  async getMatchById(@Param('id', ParseIntPipe) id: number): Promise<MatchDto> {
    return this.matchingService.getMatchById(id);
  }

  @Put(':id')
  async updateMatch(@Param('id', ParseIntPipe) id: number, @Body() matchData: MatchDto): Promise<MatchDto> {
    return this.matchingService.updateMatch(id, matchData);
  }

  @Delete(':id')
  async deleteMatch(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.matchingService.deleteMatch(id);
  }


  // Existing endpoints...
  @Post('user') // Changed to 'user' to avoid conflict
  async createUser(@Body() userData: UserData) {
    // Process the user data (e.g., store it in a database, use it for matching)
    console.log(userData);
    return { message: 'User data received successfully' };
  }

  @Get('groups')
  async getMatchingGroups(): Promise<MatchResultDto> {
    const matchingResult = await this.matchingService.findMatch(); // You might need to pass a userId or other criteria here
    return matchingResult;
  }
}

```