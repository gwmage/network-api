import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationPreferencesDto } from './dto/notification-preferences.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto'; // Import UpdateUserDto

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {} // Fixed typo

  // ... other methods ...

  @Put(':userId')
  update(@Param('userId') userId: string, @Body() notificationPreferencesDto: NotificationPreferencesDto & UpdateUserDto) {
    // Ensure type compatibility by using intersection type (&)
    return this.notificationService.update(+userId, notificationPreferencesDto);
  }
}