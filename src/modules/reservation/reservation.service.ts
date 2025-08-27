```typescript
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '../notification/notification.service';
import axios from 'axios';

@Injectable()
export class ReservationService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private notificationService: NotificationService,
  ) {
    this.apiUrl = this.configService.get<string>('RESTAURANT_API_URL');
    this.apiKey = this.configService.get<string>('RESTAURANT_API_KEY');
  }

  async makeReservation(restaurantId: string, data: any, userId: number): Promise<any> {
    const reservation = await this.performReservationAction('POST', restaurantId, data);
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
    try {
      const url = `${this.apiUrl}/reservations${method !== 'POST' ? `/${reservationId}` : ''}`;
      const headers = { 'X-API-Key': this.apiKey };
      let response;

      switch (method) {
        case 'POST':
          response = await axios.post(url, data, { headers });
          break;
        case 'PATCH':
          response = await axios.patch(url, data, { headers });
          break;
        case 'DELETE':
          response = await axios.delete(url, { headers });
          break;
        default:
          throw new HttpException('Invalid method', HttpStatus.BAD_REQUEST);
      }

      if (!response || !response.data) { // Check for successful response
        throw new HttpException('Failed to process reservation', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      if (response.status >= 400) { // Check for any client or server errors from the API
        throw new HttpException(response.data.message || 'Failed to process reservation', response.status);
      }


      return response.data;
    } catch (error) {
      console.error('Error communicating with restaurant API:', error);
      if (error instanceof HttpException) {
        throw error; // Re-throw HttpExceptions to preserve status codes
      } else {
        throw new HttpException('Failed to process reservation', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

```