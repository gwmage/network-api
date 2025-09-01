```typescript
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;


  @IsOptional()
  notificationPreferences?: {
    push: boolean;
    email: boolean;
  };
}

```