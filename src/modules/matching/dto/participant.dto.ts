```typescript
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SummarizedParticipantDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  profile_picture?: string;
}

```