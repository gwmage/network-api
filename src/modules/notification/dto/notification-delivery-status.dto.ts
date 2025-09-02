```typescript
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { NotificationStatus } from './notification.dto';

export class NotificationDeliveryStatusDto {
  @IsNotEmpty()
  @IsUUID()
  notificationId: string;

  @IsNotEmpty()
  @IsEnum(NotificationStatus)
  status: NotificationStatus;

  @IsOptional()
  deliveryMetadata?: {
    [key: string]: any; // Allows for flexible metadata storage depending on delivery method
  };
}
```