```typescript
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationService {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  async makeReservation(restaurantId: string, data: any): Promise<any> {
    return this.performReservationAction('POST', restaurantId, data);
  }

  async modifyReservation(reservationId: string, data: any): Promise<any> {
    return this.performReservationAction('PATCH', reservationId, data);
  }

  async cancelReservation(reservationId: string): Promise<any> {
    return this.performReservationAction('DELETE', reservationId);
  }

  private async performReservationAction(method: string, reservationId: string, data?: any): Promise<any> {
    const apiKey = this.configService.get('RESTAURANT_API_KEY');

    if (!apiKey) {
      throw new HttpException('Restaurant API key not configured.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const baseUrl = this.configService.get('RESTAURANT_API_URL');
    const url = `${baseUrl}/reservations/${reservationId}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : undefined
      });

      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse error response
        const errorMessage = errorData?.message || `Restaurant API request failed: ${response.status} ${response.statusText}`;
        throw new HttpException(errorMessage, response.status);
      }

      return await response.json();

    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Re-throw HttpExceptions
      }
      console.error(`Error ${method === 'POST' ? 'making' : method === 'PATCH' ? 'modifying' : 'cancelling'} reservation:`, error);
      throw new HttpException('Failed to process reservation.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  // ... other methods ...
}

```