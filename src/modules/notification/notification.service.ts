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

  async getNotificationDeliveryStatus(notificationIds: number[]): Promise<Map<number, NotificationDeliveryStatus>> {
    const notifications = await this.notificationRepository.findByIds(notificationIds);
    const statusMap = new Map<number, NotificationDeliveryStatus>();

    notifications.forEach(notification => {
      statusMap.set(notification.id, notification.deliveryStatus);
    });

    return statusMap;
  }

  // Existing methods...
}
```