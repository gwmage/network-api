```typescript
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationService {
  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  async makeReservation(restaurantId: string, data: any): Promise<any> {
    const apiKey = this.configService.get('RESTAURANT_API_KEY'); // Get API key from config service

    if (!apiKey) {
      throw new Error('Restaurant API key not configured.');
    }

    // ... rest of the reservation logic using apiKey ...
    try {
      // Example using fetch API:
      const response = await fetch(`https://restaurant-api.example.com/reservations/${restaurantId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Restaurant API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      console.error("Error making reservation:", error);
      throw error; // Re-throw the error to be handled by the controller
    }
  }


  // ... other methods ...
}

```