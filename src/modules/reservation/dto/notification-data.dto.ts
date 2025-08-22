import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class NotificationDataDto {
  @ApiProperty()
  @IsNumber()
  reservationId: number;

  @ApiProperty()
  @IsString()
  title: string;
}