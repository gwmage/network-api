```typescript
import { ApiProperty } from '@nestjs/swagger';

export class ReservationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  restaurantId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  customerName: string;

  @ApiProperty()
  customerEmail: string;

  @ApiProperty()
  customerPhone: string;

  @ApiProperty()
  reservationDate: Date;

  @ApiProperty()
  reservationTime: string;

  @ApiProperty()
  partySize: number;
}

```