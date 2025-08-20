```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

class Participant {
  @ApiProperty()
  @IsNumber()
  userId: number;

  // Add other relevant participant properties like name, profile picture, etc. as needed.
}

export class MatchingGroupDto {
  @ApiProperty()
  @IsNumber()
  groupId: number;

  @ApiProperty()
  @IsNumber()
  matchingScore: number;

  @ApiProperty({ type: [Participant] })
  @IsArray()
  participants: Participant[];
}
```