```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { NotificationPreferences } from './entities/notification-preferences.entity';

@Injectable()
export class NotificationRepository extends Repository<Notification> {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationPreferences)
    private readonly notificationPreferencesRepository: Repository<NotificationPreferences>,
  ) {
    super(
      notificationRepository.target,
      notificationRepository.manager,
      notificationRepository.queryRunner,
    );
  }

  async createNotification(notification: Partial<Notification>): Promise<Notification> {
    return this.notificationRepository.save(notification);
  }

  async getNotificationsForUser(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({ where: { userId } });
  }

  async markNotificationAsRead(notificationId: number): Promise<void> {
    await this.notificationRepository.update(notificationId, { readStatus: true });
  }

  async deleteNotification(notificationId: number): Promise<void> {
    await this.notificationRepository.delete(notificationId);
  }

  async saveNotificationPreferences(preferences: NotificationPreferences): Promise<NotificationPreferences> {
    return this.notificationPreferencesRepository.save(preferences);
  }

  async getNotificationPreferences(userId: number): Promise<NotificationPreferences | null> {
    return this.notificationPreferencesRepository.findOne({ where: { user: { id: userId } }, relations: ['user'] });
  }
}
```