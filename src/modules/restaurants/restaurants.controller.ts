import { Controller, Get } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { AvailableRestaurantDto } from './dto/available-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get('available')
  async findAvailable(): Promise<AvailableRestaurantDto[]> {
    return this.restaurantsService.findAvailable();
  }
}