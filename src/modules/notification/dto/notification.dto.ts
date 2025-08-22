import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

enum NotificationType {
  EMAIL = 'email',
  PUSH = 'push',
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
}
