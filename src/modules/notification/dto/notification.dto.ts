```typescript
import { IsString, IsDate, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { NotificationStatus } from './notification.dto';

export enum NotificationChannel {
  PUSH = 'push',
  EMAIL = 'email',
  SMS = 'sms',
}


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

  @IsEnum(NotificationStatus)
  deliveryStatus: NotificationStatus;

  @IsUUID()
  recipientId: string; // Add recipientId

  @IsString()
  matchingInformation: string; // Add matchingInformation

  @IsEnum(NotificationChannel)
  deliveryMethod: NotificationChannel; // Add deliveryMethod field
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  READ = 'read'
}

```