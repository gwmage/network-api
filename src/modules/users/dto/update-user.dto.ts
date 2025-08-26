```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsBoolean, IsString, IsArray, IsNumber, Min, Max } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  preferences?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  locationWeight?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  preferencesWeight?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  interestsWeight?: number;
}

```