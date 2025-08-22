import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class NotificationDataDto {
  @ApiProperty()
  @IsString()
  reservationId: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ enum: ['successful', 'modified', 'cancelled'] })
  @IsString()
  reservationStatus: 'successful' | 'modified' | 'cancelled';

  @ApiProperty()
  reservationDetails: {
    restaurantName: string;
    date: Date;
    time: string;
    numberOfPeople: number;
  };

  @ApiProperty()
  @IsDate()
  @Type(() => Date)  // Use Type decorator for date transformation
  timestamp: Date;
}