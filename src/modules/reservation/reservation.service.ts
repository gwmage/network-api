```typescript
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private notificationService: NotificationService,
  ) {}

  async makeReservation(restaurantId: string, data: any, userId: number): Promise<any> {
    const reservation = await this.performReservationAction('POST', restaurantId, data);
    // Send notification for new reservation
    if (reservation) {
      await this.notificationService.createNotification(userId, 'Reservation created successfully!', 'reservation');
    }
    return reservation;
  }

  async modifyReservation(reservationId: string, data: any, userId: number): Promise<any> {
    const reservation = await this.performReservationAction('PATCH', reservationId, data);

    if (reservation) {
      await this.notificationService.createNotification(userId, 'Reservation modified successfully!', 'reservation');
    }
    return reservation;

  }

  async cancelReservation(reservationId: string, userId: number): Promise<any> {
    const result = await this.performReservationAction('DELETE', reservationId);
    if (result) {
      await this.notificationService.createNotification(userId, 'Reservation cancelled successfully!', 'reservation');
    }
    return result;
  }

  private async performReservationAction(method: string, reservationId: string, data?: any): Promise<any> {
    // ... (Existing code remains unchanged)
  }

  // ... other methods ...
}

```