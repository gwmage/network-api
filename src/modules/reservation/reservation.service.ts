```typescript
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '../notification/notification.service';
import axios from 'axios';

@Injectable()
export class ReservationService {
  // ... existing code ...

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

      if (!result) {  // Check if the cancellation action was successful
        throw new HttpException('Failed to cancel reservation', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      await this.notificationService.createNotification(userId, 'Reservation cancelled successfully!', 'reservation');
      return result;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error cancelling reservation:', error); // Log the error for debugging
      throw new HttpException('Failed to cancel reservation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ... other methods ...

  private async performReservationAction(method: string, reservationId: string, data?: any): Promise<any> {
    try {
      const url = `${this.apiUrl}/reservations/${reservationId}`;
      const headers = { 'X-API-Key': this.apiKey };
      let response: any;

      switch (method) {
        case 'DELETE':
          response = await axios.delete(url, { headers });
          break;
        // ... other methods (POST, PUT) if needed
        default:
          throw new HttpException('Invalid reservation action method', HttpStatus.BAD_REQUEST);
      }

      if (response.status >= 400) { // Check for any 4xx or 5xx errors
        throw new HttpException(response.data?.message || 'Failed to perform reservation action', response.status);
      }
      return response.data; // Return the response data if successful

    } catch (error) {
       if (axios.isAxiosError(error)) {
        throw new HttpException(error.response?.data?.message || 'Failed to perform reservation action', error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
      }
      console.error('Error performing reservation action:', error);
      throw new HttpException('Failed to perform reservation action', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  // ... other methods ...

}
```