import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReservationResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  restaurantId: number;


  @ApiProperty()
  @IsString()
  startTime: string; // Or Date

  @ApiProperty()
  @IsNumber()
  numberOfPeople: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  specialRequests?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  updatedAt?: Date;
}
