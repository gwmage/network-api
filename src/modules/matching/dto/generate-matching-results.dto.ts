```typescript
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GenerateMatchingResultsRequestDto {
  @IsString()
  @IsOptional()
  matchingId?: string;
}

export class GenerateMatchingResultsResponseDto {
  @IsNumber()
  matchingId: number;

  @IsString()
  status: string;
}
```