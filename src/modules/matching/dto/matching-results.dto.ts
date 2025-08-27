```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, IsOptional } from 'class-validator';

export class ParticipantDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  profilePictureUrl?: string; 
}

export class MatchingResultsDto {
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
```
