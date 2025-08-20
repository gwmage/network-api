```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { MatchingInfoDto } from './matching-info.dto';


export class MatchingResponseDto {
  @ApiProperty({ type: [MatchingInfoDto] })
  @IsArray()
  groups: MatchingInfoDto[];
}

```