```typescript
import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('KR')
  phoneNumber: string;

  @IsOptional()
  @IsString()
  message?: string;
}
```