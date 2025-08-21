```typescript
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export enum NotificationType {
  MATCH_RESULT = 'match_result',
  RESERVATION_SUCCESS = 'reservation_success',
  RESERVATION_MODIFIED = 'reservation_modified',
  RESERVATION_CANCELLED = 'reservation_cancelled',
  GENERAL = 'general',
  COMMENT = 'comment',
}

export enum NotificationChannel {
  PUSH = 'push',
  EMAIL = 'email',
  SMS = 'sms',
}

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
  data?: any; // Can be any relevant data related to notification
}

export class CommentNotificationDto {
  @IsNotEmpty()
  @IsUUID()
  commentId: string;

  @IsNotEmpty()
  @IsUUID()
  postId: string;

  @IsNotEmpty()
  @IsString()
  commentContent: string;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;
}


export class UpdateNotificationPreferencesDto {
  @IsNotEmpty()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;
}

export class NotificationDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

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
  data?: any; // Can be any relevant data related to notification

  @IsNotEmpty()
  @IsBoolean()
  read: boolean;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}

```