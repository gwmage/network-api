```typescript
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '../notification/notification.service';
import axios from 'axios';

@Injectable()
export class ReservationService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly cancellationWindow: number;

  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private notificationService: NotificationService,
  ) {
    this.apiUrl = this.configService.get<string>('RESTAURANT_API_URL');
    this.apiKey = this.configService.get<string>('RESTAURANT_API_KEY');
    this.cancellationWindow = this.configService.get<number>('CANCELLATION_WINDOW_HOURS', 24); // Default 24 hours
  }

  async cancelReservation(reservationId: string, userId: number): Promise<any> {
    try {
      const reservation = await this.getReservation(reservationId);

      if (!reservation) {
        throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
      }

      const reservationTime = new Date(reservation.reservation_datetime);
      const now = new Date();
      const timeDifference = reservationTime.getTime() - now.getTime();
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      if (hoursDifference < this.cancellationWindow) {
        throw new HttpException(`Cancellation is not allowed within ${this.cancellationWindow} hours of the reservation time.`, HttpStatus.BAD_REQUEST);
      }

      const result = await this.performReservationAction('DELETE', reservationId);
      if (result) {
        await this.notificationService.createNotification(userId, 'Reservation cancelled successfully!', 'reservation');
      }
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to cancel reservation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async getReservation(reservationId: string): Promise<any> {
    try {
      const url = `${this.apiUrl}/reservations/${reservationId}`;
      const headers = { 'X-API-Key': this.apiKey };
      const response = await axios.get(url, { headers });

      if (response.status === HttpStatus.NOT_FOUND) {
        return null;
      }
      
      if (response.status >= 400 || !response.data) {
        throw new HttpException(response.data.message || 'Failed to get reservation details', response.status);
      }
      return response.data;


    } catch (error) {
      console.error('Error getting reservation details:', error);
      throw new HttpException('Failed to get reservation details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ... other methods (makeReservation, modifyReservation, performReservationAction) remain unchanged
}

```