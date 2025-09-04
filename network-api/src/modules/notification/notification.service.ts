```typescript
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotificationPreferences } from './entities/user-notification-preferences.entity';
import { NotificationPreferenceDto } from './dto/notification-preference.dto';
import { NotificationDeliveryStatus } from './entities/notification-delivery-status.entity';
import { User } from '../auth/entities/user.entity';
import { DeliveryMethod, DeliveryStatus } from './entities/notification-delivery-status.entity';
// import * as firebaseAdmin from 'firebase-admin'; // Import Firebase Admin SDK
// import * as nodemailer from 'nodemailer'; // Import Nodemailer

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  // private readonly firebaseMessaging: firebaseAdmin.messaging.Messaging; // Firebase Messaging instance
  // private readonly emailTransporter: nodemailer.Transporter;  // Nodemailer transporter instance


  constructor(
    @InjectRepository(UserNotificationPreferences)
    private userNotificationPreferencesRepository: Repository<UserNotificationPreferences>,
    @InjectRepository(NotificationDeliveryStatus)
    private notificationDeliveryStatusRepository: Repository<NotificationDeliveryStatus>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    // Initialize Firebase and SMTP if not already initialized
    // this.firebaseMessaging = firebaseAdmin.messaging();
    // this.emailTransporter = nodemailer.createTransport({ /* SMTP Configuration */ }); 
  }

  async saveUserNotificationPreferences(userId: number, preferences: NotificationPreferenceDto): Promise<void> {
    let userPrefs = await this.userNotificationPreferencesRepository.findOne({ where: { user: { id: userId } } });
    if (!userPrefs) {
      userPrefs = this.userNotificationPreferencesRepository.create({ user: { id: userId } });
    }
    Object.assign(userPrefs, preferences);
    await this.userNotificationPreferencesRepository.save(userPrefs);
  }

  async retrieveUserNotificationPreferences(userId: number): Promise<NotificationPreferenceDto> {
    const userPrefs = await this.userNotificationPreferencesRepository.findOne({ where: { user: { id: userId } } });
    return userPrefs ? { pushNotificationEnabled: userPrefs.pushNotificationEnabled, emailNotificationEnabled: userPrefs.emailNotificationEnabled } : null;
  }

  async manageNotificationDelivery(notificationId: string, userIds: number[]): Promise<void> {
    this.logger.log(`Sending notifications for ${notificationId}`);
    for (const userId of userIds) {
      const preferences = await this.retrieveUserNotificationPreferences(userId);
      if (preferences && preferences.pushNotificationEnabled) { // Check if preferences exist
        try {
          // Send push notification using Firebase
          // await this.firebaseMessaging.send({ /* Push notification payload */ });
          this.trackNotificationDeliveryStatus(notificationId, userId, DeliveryMethod.PUSH, DeliveryStatus.DELIVERED); // Placeholder - Replace with actual logic
        } catch (error) {
          this.logger.error(`Failed to send push notification to user ${userId}:`, error);
          this.trackNotificationDeliveryStatus(notificationId, userId, DeliveryMethod.PUSH, DeliveryStatus.FAILED);
        }
      }

      if (preferences && preferences.emailNotificationEnabled) { // Check if preferences exist
        try {
          // Send email notification using Nodemailer
          // await this.emailTransporter.sendMail({ /* Email payload */ });
          this.trackNotificationDeliveryStatus(notificationId, userId, DeliveryMethod.EMAIL, DeliveryStatus.DELIVERED); // Placeholder - Replace with actual logic
        } catch (error) {
          this.logger.error(`Failed to send email notification to user ${userId}:`, error);
          this.trackNotificationDeliveryStatus(notificationId, userId, DeliveryMethod.EMAIL, DeliveryStatus.FAILED);
        }
      }
    }
  }

  async trackNotificationDeliveryStatus(notificationId: string, userId: number, deliveryMethod: DeliveryMethod, status: DeliveryStatus): Promise<void> {
    const deliveryStatus = this.notificationDeliveryStatusRepository.create({
      notificationId,
      user: { id: userId },
      deliveryMethod,
      status,
    });
    await this.notificationDeliveryStatusRepository.save(deliveryStatus);
  }

  async retrieveNotificationDeliveryStatus(notificationId?: string, userId?: number): Promise<NotificationDeliveryStatus[]> {
    const query = this.notificationDeliveryStatusRepository.createQueryBuilder('status');

    if (notificationId) {
      query.andWhere('status.notificationId = :notificationId', { notificationId });
    }
    if (userId) {
      query.andWhere('status.user.id = :userId', { userId });
    }

    return query.getMany();
  }
}
```