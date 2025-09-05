```typescript
import { IsOptional, IsNumber, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class GetUserApplicationsDto {
  @ApiProperty({ required: false, description: '페이지 번호' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ required: false, description: '페이지 크기' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pageSize?: number = 10;

  @ApiProperty({ required: false, description: '검색어 (제목)' })
  @IsOptional()
  @IsString()
  search?: string;


  @ApiProperty({ required: false, description: '신청 상태' })
  @IsOptional()
  @IsString()
  status?: string;
}

```