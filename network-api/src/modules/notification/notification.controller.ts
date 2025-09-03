import { Controller, Put, Body, Param, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationPreferenceDto } from './dto/notification-preference.dto';
import { NotificationDeliveryStatus } from './entities/notification-delivery-status.entity';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Put('preferences/:userId')
  async saveUserNotificationPreferences(
    @Param('userId') userId: number,
    @Body() preferences: NotificationPreferenceDto,
  ): Promise<void> {
    await this.notificationService.saveUserNotificationPreferences(userId, preferences);
  }

  @Get('preferences/:userId')
  async retrieveUserNotificationPreferences(@Param('userId') userId: number): Promise<NotificationPreferenceDto> {
    return this.notificationService.retrieveUserNotificationPreferences(userId);
  }

  @Post('send')
  async manageNotificationDelivery(): Promise<void> {
    return this.notificationService.manageNotificationDelivery()
  }

  @Get('status')
  async retrieveNotificationDeliveryStatus(
    @Query('notificationId') notificationId?: string,
    @Query('userId') userId?: number,
  ): Promise<NotificationDeliveryStatus[]> {
    return this.notificationService.retrieveNotificationDeliveryStatus(notificationId, userId);
  }
}