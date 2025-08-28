```typescript
import { ApiProperty } from '@nestjs/swagger';

export class RestaurantInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  availableSeats: number;

  @ApiProperty({ required: false })
  imageUrl?: string;

  @ApiProperty({ required: false })
  description?: string;


  @ApiProperty({ required: false, isArray: true, type: String })
  dietaryOptions?: string[];

    @ApiProperty({ required: false })
  openingHours?: string;


}

```
