```typescript
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class UserInputDto {
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  preferences?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];
}

```