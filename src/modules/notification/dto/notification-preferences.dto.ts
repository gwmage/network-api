```typescript
import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { NotificationChannel, NotificationType } from './notification.dto';

export class NotificationPreferencesDto {
  @IsArray()
  @IsEnum(NotificationType, { each: true })
  notificationTypes: NotificationType[];

  @IsArray()
  @IsEnum(NotificationChannel, { each: true })
  channels: NotificationChannel[];

  @IsOptional()
  @IsString()
  notificationTime?: string;


  @IsOptional()
  @IsBoolean()
  email?: boolean;

  @IsOptional()
  @IsBoolean()
  push?: boolean;
}

```