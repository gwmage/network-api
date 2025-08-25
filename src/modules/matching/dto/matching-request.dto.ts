```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, ArrayMaxSize, ArrayMinSize } from 'class-validator';

export class MatchingRequestDto {
  @ApiProperty({
    description: 'User ID for matching',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Optional list of user IDs to exclude from matching',
    example: [2, 3],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  excludeUserIds?: number[];

  @ApiProperty({
    description: 'Optional list of regions to filter by',
    example: ['서울', '경기'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5) // Example: Limit to 5 regions
  regions?: string[];

  @ApiProperty({
    description: 'Optional list of interest areas to filter by',
    example: ['sports', 'movies'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1) // Example: At least 1 interest area
  @ArrayMaxSize(10) // Example: Limit to 10 interest areas
  interestAreas?: string[];
}

```