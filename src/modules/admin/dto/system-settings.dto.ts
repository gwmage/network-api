```typescript
import { IsNotEmpty, IsString, IsUrl, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class SystemSettingsDto {
  @IsNotEmpty()
  @IsString()
  appName: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  appUrl: string;

  @IsOptional()
  @IsString()
  appLogo: string;

  @IsOptional()
  @IsBoolean()
  maintenanceMode: boolean;

  @IsOptional()
  @IsString()
  maintenanceMessage: string;

  @IsOptional()
  @IsNumber()
  matchingInterval: number;
}

export class UpdateSystemSettingsDto {
  @IsOptional()
  @IsString()
  appName?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  appUrl?: string;

  @IsOptional()
  @IsString()
  appLogo?: string;

  @IsOptional()
  @IsBoolean()
  maintenanceMode?: boolean;

  @IsOptional()
  @IsString()
  maintenanceMessage?: string;

  @IsOptional()
  @IsNumber()
  matchingInterval?: number;
}

```