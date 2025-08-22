import { ApiProperty } from '@nestjs/swagger';

export class NotificationDataDto {
  @ApiProperty()
  reservationId: number;

  @ApiProperty()
  restaurantName: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  time: string;
}