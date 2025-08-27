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

  @Post('matching')
  async createMatchingNotification(@Req() req: Request) {
    const userId = req.user['id'];
    return this.notificationService.createMatchingNotification(userId);
  }

  @Get('matching/status')
  async getMatchingNotificationStatus(@Req() req: Request) {
    const userId = req.user['id'];
    return this.notificationService.getMatchingNotificationStatus(userId);
  }

  @Post('send')
  async sendNotification(@Req() req: Request): Promise<void> {
    const userId = req.user['id'];
    return this.notificationService.sendNotification(userId);
  }


  @Get('status')
  async getNotificationStatus(@Req() req: Request) {
    const userId = req.user['id'];
    return this.notificationService.getNotificationStatus(userId);
  }

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

  @Patch(':notificationId/status')
  async updateNotificationStatus(
    @Param('notificationId') notificationId: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationService.updateNotificationStatus(notificationId, updateNotificationDto);
  }
}

```