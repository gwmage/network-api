```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

class ParticipantDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  name: string;

  // Add other relevant participant properties like profile picture, etc. as needed.
}

export class MatchingInfoDto {
  @ApiProperty()
  @IsNumber()
  groupId: number;

  @ApiProperty({ type: [ParticipantDto] })
  @IsArray()
  participants: ParticipantDto[];

  @ApiProperty()
  @IsNumber()
  matchingScore: number;


  @ApiProperty()
  @IsString()
  explanation: string;
}

export class MatchingResponseDto {
  @ApiProperty({ type: [MatchingInfoDto] })
  @IsArray()
  groups: MatchingInfoDto[];

  @ApiProperty()
  @IsNumber()
  totalCount: number;
}

```