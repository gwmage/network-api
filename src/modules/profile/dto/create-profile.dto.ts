```typescript
import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  @IsUrl()
  profile_image?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString({ each: true })
  interests?: string[];
}
```