import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateReservationDto {
    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsString()
    placeName:string;

    @ApiProperty()
    @IsDateString()
    startTime: Date;

    @ApiProperty()
    @IsDateString()
    endTime: Date;
}