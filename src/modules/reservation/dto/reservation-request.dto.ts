import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReservationRequestDto {
    @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    userId?: number;

    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    placeName?:string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsDateString()
    startTime?: Date;

    @ApiProperty({required: false})
    @IsOptional()
    @IsDateString()
    endTime?: Date;
}