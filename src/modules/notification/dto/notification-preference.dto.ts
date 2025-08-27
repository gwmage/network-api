```typescript
import { NotificationEvent } from '../enums/notification-event.enum';
import { DeliveryMethod } from '../enums/delivery-method.enum';
import { IsEnum, IsBoolean, IsOptional, IsString } from 'class-validator';

export class NotificationPreferenceDto {
  @IsEnum(NotificationEvent)
  eventType: NotificationEvent;

  @IsEnum(DeliveryMethod)
  deliveryMethod: DeliveryMethod;

  @IsBoolean()
  enabled: boolean;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;
}
```