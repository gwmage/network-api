```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { MatchingResultsDto } from './matching-results.dto';

export class MatchingResponseDto {
  @ApiProperty({ type: [MatchingResultsDto] })
  @IsArray()
  groups: MatchingResultsDto[];

  @ApiProperty()
  @IsNumber()
  totalCount: number;
}

```
