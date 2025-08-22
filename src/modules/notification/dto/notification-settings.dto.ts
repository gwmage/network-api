import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { NotificationMethod } from '../entities/notification.entity';

export class NotificationSettingsDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  email?: boolean;

  @IsBoolean()
  @IsOptional()
  push?: boolean;

  @IsEnum(NotificationMethod)
  @IsOptional()
  preferredMethod?: NotificationMethod;
}