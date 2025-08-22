import { Injectable } from '@nestjs/common';
import { RestaurantSearchDto } from './dto/restaurant-search.dto';

@Injectable()
export class MockRestaurantApiService {
  async searchRestaurants(searchDto: RestaurantSearchDto): Promise<any> { // Replace 'any' with the actual type
    // Your mock API logic here.  This should return data that
    // matches the structure expected by your application.
    // Example:
    return [
      { id: 1, name: 'Restaurant A', availableTables: 5 },
      { id: 2, name: 'Restaurant B', availableTables: 2 },
    ];
  }
}
