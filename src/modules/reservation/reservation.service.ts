```typescript
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '../notification/notification.service';
import axios from 'axios';

@Injectable()
export class ReservationService {
  private readonly cancellationWindow: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly notificationService: NotificationService,
    @Inject('API_URL') private readonly apiUrl: string,
    @Inject('API_KEY') private readonly apiKey: string
  ) {
    // Read and apply cancellation window from environment variables
    const cancellationWindowHours = this.configService.get<number>('CANCELLATION_WINDOW_HOURS');
    this.cancellationWindow = cancellationWindowHours || 24; // Default to 24 hours if not set
  }

  // ... existing code ...
}
```