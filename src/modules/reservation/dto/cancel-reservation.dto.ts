```typescript
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CancelReservationDto {
  @ApiProperty()
  @IsNotEmpty()
  reservationId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}

```
