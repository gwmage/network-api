```typescript
import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class MockRestaurantApiService {
  private reservations: any[] = [];

  async createReservation(data: CreateReservationDto) {
    const newReservation = {
      ...data,
      reservation_id: this.reservations.length + 1,
      status: 'success',
      message: 'Reservation created successfully',
    };
    this.reservations.push(newReservation);
    return newReservation;
  }

  async getReservation(id: number) {
    const reservation = this.reservations.find(
      (r) => r.reservation_id === id,
    );
    if (reservation) {
      return { status: 'success', reservation };
    } else {
      return {
        status: 'error',
        message: 'Reservation not found',
        error_code: 404,
      };
    }
  }
}

```