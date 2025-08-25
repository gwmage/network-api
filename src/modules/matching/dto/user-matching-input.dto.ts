```typescript
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class UserMatchingInputDTO {
  @IsNotEmpty()
  @IsString()
  region: string;

  @IsOptional()
  @IsString()
  preferences?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];
}

```