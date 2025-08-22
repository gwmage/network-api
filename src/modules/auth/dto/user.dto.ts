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

  @IsNotEmpty()
  activities: Activity[];
}

export class Activity {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  timestamp: Date;

  @IsNotEmpty()
  data: any;
}
```