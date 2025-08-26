```typescript
import {ApiProperty} from "@nestjs/swagger";
import { IsOptional, IsArray, IsString } from 'class-validator';

export class FindUsersQueryDto {
    @ApiProperty()
    @IsOptional()
    keyword?: string;

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