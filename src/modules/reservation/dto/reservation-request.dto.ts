import { ApiProperty } from '@nestjs/swagger';

export class ReservationRequestDto {
  @ApiProperty()
  restaurantId: string;
}