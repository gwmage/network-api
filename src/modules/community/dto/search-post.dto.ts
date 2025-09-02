```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNumber, IsArray, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export enum SortOptions {
  RECENCY = 'recency',
  RELEVANCE = 'relevance',
}

export class SearchPostDto {
  @ApiProperty({ required: false, description: 'Keyword to search' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiProperty({ required: false, description: 'Filter by title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, description: 'Filter by content' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ required: false, description: 'Filter by author' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({ required: false, description: 'Filter by category IDs' })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [parseInt(value)];
    }
    if (Array.isArray(value)) {
      return value.map(Number);
    }
    return undefined;
  })
  categoryIds?: number[];

  @ApiProperty({ required: false, description: 'Filter by tag names' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tagNames?: string[];

  @ApiProperty({ required: false, description: 'Sort by recency or relevance', enum: SortOptions, default: SortOptions.RECENCY })
  @IsOptional()
  @IsEnum(SortOptions)
  sort?: SortOptions = SortOptions.RECENCY;

  @ApiProperty({ required: false, description: 'Page number for pagination', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, description: 'Number of items per page', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}

```