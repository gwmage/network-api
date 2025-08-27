```typescript
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { NotificationChannel, NotificationType } from './notification.dto';
import { DeliveryStatus } from './notification.dto';

export class NotificationPreferencesDto {
  @IsEnum(NotificationType)
  notificationType: NotificationType;

  @IsBoolean()
  email: boolean;

  @IsOptional()
  @IsEnum(DeliveryStatus)
  emailStatus?: DeliveryStatus;

  @IsBoolean()
  push: boolean;

  @IsOptional()
  @IsEnum(DeliveryStatus)
  pushStatus?: DeliveryStatus;
}
```