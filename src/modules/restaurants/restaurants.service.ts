import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  BadGatewayException,
  Logger,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AvailableRestaurantDto } from './dto/available-restaurant.dto';
import { AxiosError } from 'axios';

@Injectable()
export class RestaurantsService {
  private readonly logger = new Logger(RestaurantsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async findAvailable(): Promise<AvailableRestaurantDto[]> {
    const apiUrl = this.configService.get<string>('RESTAURANT_API_URL');
    const apiKey = this.configService.get<string>('RESTAURANT_API_KEY');

    const headers = {
      'x-api-key': apiKey,
    };

    const response$ = this.httpService
      .get(`${apiUrl}/restaurants/available`, { headers })
      .pipe(
        map((response) => response.data),
        catchError((error: AxiosError) => {
          this.logger.error(
            `Failed to fetch available restaurants. Status: ${
              error.response?.status
            }, Data: ${JSON.stringify(error.response?.data)}`,
          );

          if (error.response) {
            const { status, data } = error.response;
            if (status >= 400 && status < 500) {
              // Client error from external API (e.g., invalid API key)
              throw new HttpException(
                `External API client error: ${
                  (data as any)?.message || 'Invalid request'
                }`,
                status,
              );
            }
            if (status >= 500) {
              // Server error from external API (e.g., service down)
              throw new BadGatewayException(
                `External restaurant service is currently unavailable.`,
              );
            }
          }

          // Network error, timeout, etc.
          throw new InternalServerErrorException(
            'An error occurred while communicating with the restaurant service.',
          );
        }),
      );

    const externalData = await firstValueFrom(response$);

    // Standardize the response.
    // This assumes the external API returns an array of objects with a specific structure.
    return externalData.map((restaurant: any) => ({
      id: restaurant.id,
      name: restaurant.restaurantName,
      address: restaurant.location?.address,
      cuisine: restaurant.type,
      rating: restaurant.stars,
      availableSlots: restaurant.openSlots,
    }));
  }
}