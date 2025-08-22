import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

export class RestaurantSearchDto {
  @ApiProperty({ required: false, description: 'Group size' })
  @IsOptional()
  @IsNumber()
  groupSize?: number;

  @ApiProperty({ required: false, description: 'Dietary preferences (e.g., vegetarian, vegan, gluten-free)' })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  dietaryPreferences?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cuisine?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  priceRange?: number;
}