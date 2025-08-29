import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(
    userId: string,
    reservation,
    cancellationReason?: string,
  ): Promise<Notification> {
    const message = `Your reservation for ${reservation.restaurantName} on ${reservation.reservationDatetime.toLocaleString()} has been cancelled.${cancellationReason ? ` Reason: ${cancellationReason}` : ''}`;

    const notification = this.notificationRepository.create({
      userId,
      message,
      // ... other properties
    });

    return this.notificationRepository.save(notification);
  }
}
