```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

class Participant {
  @ApiProperty()
  @IsNumber()
  userId: number;

  // Add other relevant participant properties like name, profile picture, etc. as needed.
}

export class MatchingResultsDto {
  @ApiProperty()
  @IsNumber()
  groupId: number;

  @ApiProperty({ type: [Participant] })
  @IsArray()
  participants: Participant[];

  @ApiProperty()
  @IsNumber()
  matchingScore: number;

  @ApiProperty()
  @IsString()
  explanation: string;
}
```