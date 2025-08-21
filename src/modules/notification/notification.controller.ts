```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationPreferencesDto } from './dto/notification-preferences.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // ... (Existing code remains unchanged)

  @Post('comment')
  async createCommentNotification(
    @Body() createNotificationDto: CreateNotificationDto
  ): Promise<void> {

    return this.notificationService.createCommentNotification(
      createNotificationDto.userId,
      createNotificationDto.postId,
      createNotificationDto.commentContent
    )
  }


}

```