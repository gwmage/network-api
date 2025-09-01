```typescript
import { IsNotEmpty, IsString, IsOptional, IsArray, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Location {
  @IsNotEmpty()
  @IsString()
  region: string;
}

class Preferences {
  @IsOptional()
  @IsString()
  value?: string;
}

class Interests {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  values?: string[];
}


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
  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @IsOptional()
  @ValidateNested()
  @Type(() => Preferences)
  preferences?: Preferences;

  @IsOptional()
  @ValidateNested()
  @Type(() => Interests)
  interests?: Interests;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Weights)
  weights?: Weights;
}

```