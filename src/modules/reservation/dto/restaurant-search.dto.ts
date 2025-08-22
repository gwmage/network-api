import { ApiProperty } from "@nestjs/swagger";

export class RestaurantSearchDto {
    @ApiProperty()
    query: string;
}