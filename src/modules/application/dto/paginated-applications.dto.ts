```typescript
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationInfoDto } from './application-info.dto';
import { IsOptional, IsString, IsNumber, IsEnum, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SortOrder } from '../../users/enums/sort-order.enum';

export class PaginatedApplicationsDto {
  @ApiProperty({ type: [ApplicationInfoDto] })
  data: ApplicationInfoDto[];

  @ApiProperty()
  total: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @ApiProperty({ required: false, enum: SortOrder, default: SortOrder.ASC })
  @IsOptional()
  @IsEnum(SortOrder)
  @Transform(({ value }) => value.toUpperCase())
  sort?: SortOrder = SortOrder.ASC;

  @ApiProperty({ required: false, default: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiProperty({
    description: 'Optional list of regions to filter by',
    example: ['서울', '경기'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  regions?: string[];

  @ApiProperty({
    description: 'Optional list of interest areas to filter by',
    example: ['sports', 'movies'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];


}

```