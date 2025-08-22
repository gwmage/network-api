import { ApiProperty } from '@nestjs/swagger';

export class RestaurantSearchDto {

  @ApiProperty()
  searchTerm: string;

}