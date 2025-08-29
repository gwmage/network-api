```typescript
import { IsNotEmpty, IsString, IsOptional, IsArray, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Weights {
  @IsOptional()
  @IsNumber()
  location?: number;

  @IsOptional()
  @IsNumber()
  preferences?: number;

  @IsOptional()
  @IsNumber()
  interests?: number;
}

export class UserInputDto {
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

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Weights)
  weights?: Weights;
}

```
