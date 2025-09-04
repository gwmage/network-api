import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CancelReservationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reservationId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}