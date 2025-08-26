```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsString, IsOptional, IsArray, ArrayMaxSize } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

class UserQueryParams {
  @ApiPropertyOptional({
    description: 'Optional list of regions to filter by',
    example: ['서울', '경기'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value)) // Allow single string or array of strings
  @ArrayMaxSize(5)
  regions?: string[];


  @ApiPropertyOptional({
    description: 'Optional list of interest areas to filter by',
    example: ['sports', 'movies'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value)) // Allow single string or array of strings
  interests?: string[];
}


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: UserQueryParams) {
    return this.usersService.findAll(query);
  }
}

```