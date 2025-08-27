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
  @ApiProperty({ type: [ParticipantDto] })
  @IsArray()
  participants: ParticipantDto[];

  @ApiProperty()
  @IsNumber()
  matchingScore: number;

  @ApiProperty()
  @IsString()
  explanation: string;


  @ApiProperty()
  @IsNumber()
  groupId: number;

  @ApiProperty()
  @IsNumber()
  totalCount: number;
}
```