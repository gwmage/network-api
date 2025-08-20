```typescript
import { ApiProperty } from '@nestjs/swagger';

export class ReservationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  restaurantName: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  time: string;

  @ApiProperty()
  numberOfPeople: number;
}
```