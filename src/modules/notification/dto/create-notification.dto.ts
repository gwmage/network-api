```typescript
import { IsNotEmpty, IsString, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { NotificationType } from './notification.dto';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  data?: any;
}
```