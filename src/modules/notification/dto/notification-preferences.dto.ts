```typescript
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { NotificationChannel, NotificationType } from './notification.dto';

export class NotificationPreferencesDto {
  @IsEnum(NotificationType)
  notificationType: NotificationType;

  @IsBoolean()
  email: boolean;

  @IsBoolean()
  push: boolean;
}
```