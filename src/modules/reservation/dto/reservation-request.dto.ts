import { ApiProperty } from '@nestjs/swagger';

export class ReservationRequestDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  time: string;

  @ApiProperty()
  numberOfPeople: number;

  @ApiProperty()
  restaurantId: number;
}