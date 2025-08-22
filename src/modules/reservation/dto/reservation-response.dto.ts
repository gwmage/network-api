import { ApiProperty } from '@nestjs/swagger';

export class ReservationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  restaurantId: string;
}