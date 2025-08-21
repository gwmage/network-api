```typescript
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  notificationPreferences: {
    push: boolean;
    email: boolean;
  };
}
```