```typescript
// Import necessary decorators and types
import { IsString, IsDate, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { NotificationChannel, NotificationStatus } from './notification.dto';

export class NotificationDto {
  @IsString()
  userId: string;

  @IsString()
  message: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsUUID()
  recipientId: string;

  @IsString()
  matchingInformation: string;

  @IsEnum(NotificationChannel)
  deliveryMethod: NotificationChannel;

  @IsEnum(NotificationStatus)
  deliveryStatus: NotificationStatus;
}
```