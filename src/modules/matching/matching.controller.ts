```typescript
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { UserData } from './dto/user-data.dto';
import { MatchResultDto } from './dto/match-result.dto';


@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Post()
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