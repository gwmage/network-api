```typescript
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { NotificationType } from './notification.dto';
import { DeliveryStatus } from './notification.dto';

export class NotificationPreferencesDto {
  @IsOptional()
  @IsEnum(NotificationType)
  notificationType?: NotificationType;

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