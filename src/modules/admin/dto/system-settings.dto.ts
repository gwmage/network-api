import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class SystemSettingsDto {
  @IsNotEmpty()
  @IsString()
  appName: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  appUrl: string;

  @IsNotEmpty()
  @IsString()
  appLogo: string;

  @IsNotEmpty()
  @IsBoolean()
  maintenanceMode: boolean;

  @IsNotEmpty()
  @IsString()
  maintenanceMessage: string;

  @IsNotEmpty()
  @IsNumber()
  latestAppVersion: number;

  @IsOptional()
  @IsString()
  updateMessage?: string;
}
