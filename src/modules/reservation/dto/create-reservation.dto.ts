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
}