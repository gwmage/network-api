import { ApiProperty } from '@nestjs/swagger';

export class ReservationRequestDto {
  @ApiProperty()
  restaurantId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  time: string;

  @ApiProperty()
  numberOfPeople: number;
}