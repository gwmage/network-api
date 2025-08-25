```typescript
import { Injectable } from '@nestjs/common';
import { RestaurantSearchDto } from './dto/restaurant-search.dto';

@Injectable()
export class MockRestaurantApiService {
  async searchRestaurants(searchDto: RestaurantSearchDto): Promise<any[]> {
    // Your mock API logic here.  This should return data that
    // matches the structure expected by your application.
    // Example:
    console.log('Using mock restaurant API:', searchDto); // Log search criteria
    return [
      {
        id: 1,
        name: 'Mock Restaurant A',
        availableTables: 5,
        date: searchDto.date,
        time: searchDto.time,
        partySize: searchDto.partySize,
      },
      {
        id: 2,
        name: 'Mock Restaurant B',
        availableTables: 2,
        date: searchDto.date,
        time: searchDto.time,
        partySize: searchDto.partySize,

      },
    ];
  }

  async createReservation(reservationData: any): Promise<any> {
    console.log('Creating mock reservation:', reservationData);
    return {
      status: 'success',
      message: 'Reservation created successfully',
      reservation_id: Math.floor(Math.random() * 10000) + 1,
    };
  }


}
```