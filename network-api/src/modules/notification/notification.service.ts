import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotificationPreferences } from './entities/user-notification-preferences.entity';
import { NotificationPreferenceDto } from './dto/notification-preference.dto';
import { NotificationDeliveryStatus } from './entities/notification-delivery-status.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(UserNotificationPreferences)
    private userNotificationPreferencesRepository: Repository<UserNotificationPreferences>,
    @InjectRepository(NotificationDeliveryStatus)
    private notificationDeliveryStatusRepository: Repository<NotificationDeliveryStatus>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

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

  async manageNotificationDelivery(): Promise<void> {
    // Implement your notification delivery logic here
  }

  async trackNotificationDeliveryStatus(notificationId: string, userId: number, deliveryMethod: any /* Replace 'any' with your enum type */, status: any /* Replace 'any' with your enum type */): Promise<void> {
    const deliveryStatus = this.notificationDeliveryStatusRepository.create({
      notificationId,
      user: { id: userId },
      deliveryMethod,
      status,
    });
    await this.notificationDeliveryStatusRepository.save(deliveryStatus);
  }

  async retrieveNotificationDeliveryStatus(notificationId?: string, userId?: number): Promise<NotificationDeliveryStatus[]> {
    // Implement your query logic based on notificationId and/or userId
    return this.notificationDeliveryStatusRepository.find(); // Placeholder
  }
}