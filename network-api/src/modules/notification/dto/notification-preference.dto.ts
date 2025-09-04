import { IsArray, IsBoolean, IsIn, IsOptional, IsString, ValidateIf } from 'class-validator';
import { NotificationEvent } from './notification-event.enum';

export class NotificationPreferenceDto {
  @IsBoolean()
  @IsOptional()
  pushNotificationEnabled: boolean;

  @IsBoolean()
  @IsOptional()
  emailNotificationEnabled: boolean;

  @IsArray()
  @IsOptional()
  @IsIn(Object.values(NotificationEvent), { each: true })
  notificationEvents: NotificationEvent[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  notificationMethods: string[];


  @IsString()
  @IsOptional()
  notificationStartTime: string;

  @IsString()
  @IsOptional()
  notificationEndTime: string;
}