```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';

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


  @ApiProperty({ required: false, description: 'Sort by recency or relevance', enum: SortOptions })
  @IsOptional()
  @IsEnum(SortOptions)
  sort?: SortOptions = SortOptions.RECENCY;

  @ApiProperty({ required: false, description: 'Page number for pagination', default: 1 })
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ required: false, description: 'Number of items per page', default: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number = 10;
}

```