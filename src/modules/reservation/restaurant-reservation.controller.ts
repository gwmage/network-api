```typescript
import { Controller, Get, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RestaurantReservationService } from './restaurant-reservation.service';

@Controller('restaurants')
export class RestaurantReservationController {
  constructor(
    @Inject(RestaurantReservationService) private readonly restaurantReservationService: RestaurantReservationService,
  ) {}

  @Get()
  async getRestaurants() {
    try {
      const restaurants = await this.restaurantReservationService.getRestaurants();
      return restaurants;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Re-throw if it's already an HttpException
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

```