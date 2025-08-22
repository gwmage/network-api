import { ApiProperty } from '@nestjs/swagger';

export class ReservationResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    restaurantId: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    time: string;

    @ApiProperty()
    numberOfPeople: number;
}