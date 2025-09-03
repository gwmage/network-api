```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationDeliveryStatus } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async getNotificationStatus(userId: number): Promise<NotificationDeliveryStatus> {
    const notifications = await this.notificationRepository.find({
      where: { recipient: { id: userId } },
      order: { timestamp: 'DESC' },
    });

    if (notifications.length === 0) {
      return NotificationDeliveryStatus.UNREAD;
    }

    return notifications[0].deliveryStatus;
  }

  async updateNotificationStatus(notificationId: number, status: NotificationDeliveryStatus): Promise<void> {
    const notification = await this.notificationRepository.findOne({ where: { id: notificationId } });

    if (!notification) {
      throw new Error(`Notification with ID ${notificationId} not found.`);
    }

    notification.deliveryStatus = status;
    await this.notificationRepository.save(notification);
  }

  async getNotificationDeliveryStatus(notificationId: number): Promise<NotificationDeliveryStatus> {
    const notification = await this.notificationRepository.findOne({ where: { id: notificationId } });

    if (!notification) {
      throw new Error(`Notification with ID ${notificationId} not found.`);
    }

    return notification.deliveryStatus;
  }
}
```