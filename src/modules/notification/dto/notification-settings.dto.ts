```typescript
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { NotificationChannel } from './notification.dto';

export class NotificationSettingsDto {
  @IsNotEmpty()
  @IsBoolean()
  matchingResults: boolean;

  @IsNotEmpty()
  @IsBoolean()
  reservationUpdates: boolean;

  @IsOptional()
  @IsEnum(NotificationChannel)
  deliveryMethod?: NotificationChannel; // Default: PUSH
}
```