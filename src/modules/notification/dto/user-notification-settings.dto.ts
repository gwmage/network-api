```typescript
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { NotificationPreferencesDto } from './notification-preferences.dto';
import { DeliveryMethod } from './delivery-method.enum';

export class UserNotificationSettingsDto {
  @IsBoolean()
  enabled: boolean;

  @IsOptional()
  @IsEnum(DeliveryMethod, { each: true })
  deliveryMethods?: DeliveryMethod[];

  @IsOptional()
  preferences?: NotificationPreferencesDto[];
}
```