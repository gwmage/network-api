import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotificationPreferences } from './entities/user-notification-preferences.entity';
import { NotificationPreferenceDto } from './dto/notification-preference.dto';
import { NotificationDeliveryStatus } from './entities/notification-delivery-status.entity';
import { User } from '../auth/entities/user.entity';
import { DeliveryMethod, DeliveryStatus } from './entities/notification-delivery-status.entity';
import { NotificationEvent } from './dto/notification-event.enum';
// import * as firebaseAdmin from 'firebase-admin'; // Import Firebase Admin SDK
// import * as nodemailer from 'nodemailer'; // Import Nodemailer

@Injectable()
export class NotificationService {
  // ... (existing code)

  async manageNotificationDelivery(notificationEvent: NotificationEvent, userIds: number[], data?: any): Promise<void> {
    this.logger.log(`Sending notifications for ${notificationEvent}`);
    for (const userId of userIds) {
      const preferences = await this.retrieveUserNotificationPreferences(userId);
      if (preferences && preferences.pushNotificationEnabled) { // Check if preferences exist
        try {
          // Send push notification using Firebase, include relevant data
          // await this.firebaseMessaging.send({ /* Push notification payload with data */ });
          this.trackNotificationDeliveryStatus(notificationEvent, userId, DeliveryMethod.PUSH, DeliveryStatus.DELIVERED); // Placeholder - Replace with actual logic
        } catch (error) {
          this.logger.error(`Failed to send push notification to user ${userId}:`, error);
          this.trackNotificationDeliveryStatus(notificationEvent, userId, DeliveryMethod.PUSH, DeliveryStatus.FAILED);
        }
      }

      if (preferences && preferences.emailNotificationEnabled) { // Check if preferences exist
        try {
          // Send email notification using Nodemailer, include relevant data
          // await this.emailTransporter.sendMail({ /* Email payload with data*/ });
          this.trackNotificationDeliveryStatus(notificationEvent, userId, DeliveryMethod.EMAIL, DeliveryStatus.DELIVERED); // Placeholder - Replace with actual logic
        } catch (error) {
          this.logger.error(`Failed to send email notification to user ${userId}:`, error);
          this.trackNotificationDeliveryStatus(notificationEvent, userId, DeliveryMethod.EMAIL, DeliveryStatus.FAILED);
        }
      }
    }
  }


  async trackNotificationDeliveryStatus(notificationEvent: string, userId: number, deliveryMethod: DeliveryMethod, status: DeliveryStatus): Promise<void> {
    const deliveryStatus = this.notificationDeliveryStatusRepository.create({
      notificationId: notificationEvent,  // Use notificationEvent as notificationId
      user: { id: userId },
      deliveryMethod,
      status,
    });
    await this.notificationDeliveryStatusRepository.save(deliveryStatus);
  }

 // ... (existing code)
}