import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty()
  @IsNumber()
  restaurantId: number;

  @ApiProperty()
  @IsString()
  customerName: string;

  @ApiProperty()
  @IsString()
  customerEmail: string;

  @ApiProperty()
  @IsString()
  customerPhone: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  reservationDate: Date;

  @ApiProperty()
  @IsString()
  reservationTime: string;

  @ApiProperty()
  @IsNumber()
  partySize: number;
}