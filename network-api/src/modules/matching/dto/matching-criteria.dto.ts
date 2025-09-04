```typescript
import { IsOptional, IsArray, IsString, IsNumber } from 'class-validator';

export class MatchingCriteriaDto {
  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  preferences?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsNumber()
  groupSize?: number;
}
```