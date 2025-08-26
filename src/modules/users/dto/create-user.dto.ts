```typescript
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

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

  @IsOptional()
  @IsNumber()
  locationWeight?: number;

  @IsOptional()
  @IsNumber()
  preferencesWeight?: number;

  @IsOptional()
  @IsNumber()
  interestsWeight?: number;
}

```