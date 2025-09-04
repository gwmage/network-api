import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CancelReservationDto {
  @IsNotEmpty()
  reservationId: number;

  @IsOptional()
  @IsString()
  cancellationReason?: string;
}