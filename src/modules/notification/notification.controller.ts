```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationPreferencesDto } from './dto/notification-preferences.dto';
import { CommentNotificationDto } from './dto/notification.dto';


@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

    @Post('comment')
    createCommentNotification(
        @Body() commentNotificationDto: CommentNotificationDto,
    ) {
        return this.notificationService.createCommentNotification(
            commentNotificationDto,
        );
    }


  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(id);
  }

  @Post('preferences')
  createPreferences(@Body() notificationPreferencesDto: NotificationPreferencesDto) {
    return this.notificationService.createPreferences(notificationPreferencesDto);
  }

  @Get('preferences')
  getPreferences() {
    return this.notificationService.getPreferences();
  }

  @Put('preferences')
  updatePreferences(@Body() notificationPreferencesDto: NotificationPreferencesDto) {
    return this.notificationService.updatePreferences(notificationPreferencesDto);
  }

  @Delete('preferences')
  deletePreferences() {
    return this.notificationService.deletePreferences();
  }
}

```