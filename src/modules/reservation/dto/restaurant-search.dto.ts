import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class RestaurantSearchDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    search?: string;
}