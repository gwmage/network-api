```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationRepository extends Repository<Notification> {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
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

  // Add other methods as needed, e.g., deleting notifications
  async deleteNotification(notificationId: number): Promise<void> {
    await this.notificationRepository.delete(notificationId);
  }
}
```