```typescript
import { IsBoolean, IsOptional } from 'class-validator';

export class CreateNotificationPreferencesDto {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  push: boolean;
}

export class UpdateNotificationPreferencesDto {
  @IsOptional()
  @IsBoolean()
  email?: boolean;

  @IsOptional()
  @IsBoolean()
  push?: boolean;
}

export class NotificationPreferencesDto {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  push: boolean;
}

```