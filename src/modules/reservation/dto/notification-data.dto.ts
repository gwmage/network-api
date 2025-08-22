import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsObject, IsDate, IsNumber } from 'class-validator';

enum ReservationStatus {
  SUCCESSFUL = 'successful',
  MODIFIED = 'modified',
  CANCELLED = 'cancelled',
}

export class NotificationDataDto {
  @ApiProperty()
  @IsString()
  reservationId: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ enum: ReservationStatus })
  @IsEnum(ReservationStatus)
  reservationStatus: ReservationStatus;

  @ApiProperty()
  @IsObject()
  reservationDetails: {
    restaurantName: string;
    date: Date;
    time: string;
    numberOfPeople: number;
  };

  @ApiProperty()
  @IsDate()
  timestamp: Date;
}