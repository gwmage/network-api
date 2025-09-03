import { IsBoolean, IsOptional } from 'class-validator';

export class NotificationPreferenceDto {
  @IsBoolean()
  @IsOptional()
  pushNotificationEnabled: boolean;

  @IsBoolean()
  @IsOptional()
  emailNotificationEnabled: boolean;
}