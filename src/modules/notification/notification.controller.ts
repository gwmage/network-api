```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationPreferencesDto } from './dto/notification-preferences.dto';
import { Request } from 'express';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // ... (Existing code remains unchanged)

  @Get('preferences')
  async getPreferences(@Req() req: Request): Promise<NotificationPreferencesDto> {
    const userId = req.user['id']; // Assuming auth middleware adds user object to request
    return this.notificationService.getPreferences(userId);
  }

  @Put('preferences')
  async updatePreferences(
    @Req() req: Request,
    @Body() preferences: NotificationPreferencesDto
  ): Promise<void> {
    const userId = req.user['id']; // Assuming auth middleware adds user object to request
    return this.notificationService.updatePreferences(userId, preferences);
  }
}

```