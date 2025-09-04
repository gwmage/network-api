```typescript
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SortOrder } from '../../users/enums/sort-order.enum';


export class GetApplicationsDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  pageSize?: number = 10;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sortField?: string;

  @ApiProperty({ required: false, enum: SortOrder, default: SortOrder.ASC })
  @IsOptional()
  @IsEnum(SortOrder)
  @Transform(({ value }) => value.toUpperCase())
  sortOrder?: SortOrder = SortOrder.ASC;


  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, enum: ['json', 'csv'] })
  @IsOptional()
  @IsEnum(['json', 'csv'])
  format?: 'json' | 'csv';
}

```