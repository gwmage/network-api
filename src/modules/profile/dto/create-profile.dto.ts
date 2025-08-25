```typescript
import { IsNotEmpty, IsString, IsOptional, IsUrl, IsArray } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsUrl()
  profilePictureUrl?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  selfIntroduction?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  areasOfInterest?: string[];
}

```