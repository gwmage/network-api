```typescript
import { ApiProperty } from "@nestjs/swagger";

export class CreateReservationDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  time: string;

  @ApiProperty()
  numberOfPeople: number;

  @ApiProperty()
  restaurantId: number;

  @ApiProperty()
  customerName: string;

  @ApiProperty()
  customerEmail: string;

  @ApiProperty()
  customerPhone: string;

  @ApiProperty()
  groupId?: number;

  @ApiProperty({ required: false })
  platformSpecificInformation?: Record<string, any>;
}

```