import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReservationResponseDto {
    @ApiProperty()
    @IsNumber()
    id: number;

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

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    createdAt?: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    updatedAt?: Date;
}