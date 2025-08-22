import { ApiProperty } from "@nestjs/swagger";

export class CreateReservationDto {
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