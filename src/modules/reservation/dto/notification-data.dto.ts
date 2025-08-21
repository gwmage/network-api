```typescript
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDataDto {
  @ApiProperty()
  reservationId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: ['successful', 'modified', 'cancelled'] })
  reservationStatus: 'successful' | 'modified' | 'cancelled';

  @ApiProperty()
  reservationDetails: {
    restaurantName: string;
    date: Date;
    time: string;
    numberOfPeople: number;
  };

  @ApiProperty()
  timestamp: Date;
}
```