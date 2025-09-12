```typescript
import { IsEmail, IsNotEmpty, IsString, MinLength, IsPhoneNumber, IsOptional, IsArray } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsPhoneNumber('KR')
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  preferences?: string;

  @IsOptional()
  @IsArray()
  interests?: string[];
}

```