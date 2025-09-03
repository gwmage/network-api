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

  // ... other methods

  @Get(':notificationId/delivery-status')
  async getNotificationDeliveryStatus(@Param('notificationId') notificationId: string) {
    return this.notificationService.getNotificationDeliveryStatus(notificationId);
  }

  // ... other methods
}
```