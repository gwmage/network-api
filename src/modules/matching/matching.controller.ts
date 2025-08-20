```typescript
import { Body, Controller, Post } from '@nestjs/common';

interface UserPreferences {
  // Define the structure of user preferences
}

interface UserInterests {
  // Define the structure of user interests
}

interface UserData {
  region: string;
  preferences: UserPreferences;
  interests: UserInterests;
}

@Controller('matching')
export class MatchingController {
  @Post()
  async createUser(@Body() userData: UserData) {
    // Process the user data (e.g., store it in a database, use it for matching)
    console.log(userData);
    return { message: 'User data received successfully' };
  }
}

```