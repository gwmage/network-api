```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '../notification/notification.service'; // Import NotificationService

@Injectable()
export class ReservationService {
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private notificationService: NotificationService, // Inject NotificationService
  ) {}

  async makeReservation(restaurantId: string, data: any): Promise<any> {
    // ... existing code ...

    try {
      // ... existing code ...

      const reservation = await response.json();

      // Notify user about successful reservation
      await this.notificationService.sendNotification(data.userId, 'Reservation successful', `Your reservation for ${data.numberOfPeople} people at ${restaurantId} is confirmed.`);

      return reservation;

    } catch (error) {
      // ... existing code ...
    }
  }

  async updateReservation(id: string, data: any): Promise<any> {
    // ... logic to update reservation ...

    try {
      // ... update logic

      // Notify user about successful modification
      await this.notificationService.sendNotification(data.userId, 'Reservation modified', `Your reservation (ID: ${id}) has been successfully modified.`);


      return updatedReservation;
    }
    catch (error) {
      // ... error handling
    }
  }


  async cancelReservation(id: string, userId: string): Promise<any> {
    // ... logic to cancel reservation ...

    try {
      // ... cancellation logic

      // Notify user about successful cancellation
      await this.notificationService.sendNotification(userId, 'Reservation cancelled', `Your reservation (ID: ${id}) has been successfully cancelled.`);

      return { message: 'Reservation cancelled successfully' };

    } catch (error) {
      // ... error handling
    }
  }
  // ... other methods ...
}

```