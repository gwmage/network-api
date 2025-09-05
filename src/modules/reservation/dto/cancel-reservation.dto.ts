```typescript
import { IsOptional, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CancelReservationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}

```