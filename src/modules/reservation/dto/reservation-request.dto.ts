import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReservationRequestDto {
  @ApiProperty({
    description: 'Restaurant ID',
    example: 1,
  })
  @IsNumber()
  restaurantId: number;

  @ApiProperty({
    description: 'Start time of the reservation',
    example: '2024-05-10T19:30:00Z',
  })
  @IsString()
  startTime: string; // Or Date if you are using Date objects

  @ApiProperty({
    description: 'Number of people',
    example: 2,
  })
  @IsNumber()
  numberOfPeople: number;

  @ApiProperty({
    description: 'Any special requests (optional)',
    example: 'Allergic to peanuts',
    required: false,
  })
  @IsOptional()
  @IsString()
  specialRequests?: string;
}
