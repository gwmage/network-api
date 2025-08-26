```typescript
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from '../notification/notification.service';
import axios from 'axios';

@Injectable()
export class ReservationService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private notificationService: NotificationService,
  ) {
    this.apiUrl = this.configService.get<string>('RESTAURANT_API_URL');
    this.apiKey = this.configService.get<string>('RESTAURANT_API_KEY');
  }

}

```