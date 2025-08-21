```typescript
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

  @ApiProperty({ required: false, description: 'Cuisine type (e.g., Italian, Mexican, Japanese)' })
  @IsOptional()
  @IsString()
  cuisineType?: string;

  @ApiProperty({ required: false, description: 'Location (e.g., city, zip code)' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false, description: 'Price range (e.g., $, $$, $$$)' })
  @IsOptional()
  @IsString()
  priceRange?: string;

  @ApiProperty({ required: false, description: 'Rating (e.g., 4.5)' })
  @IsOptional()
  @IsNumber()
  rating?: number;
}

```