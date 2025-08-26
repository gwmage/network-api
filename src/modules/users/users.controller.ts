```typescript
import { Controller, Get, Query, Delete, Param, ParseIntPipe, NotFoundException, Put, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsString, IsOptional, IsArray, ArrayMaxSize } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

class UserQueryParams {
  @ApiPropertyOptional({
    description: 'Optional list of regions to filter by',
    example: ['서울', '경기'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
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
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  interests?: string[];
}

@Controller('members') // Changed the route to /members
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { id: user.id };
  }


  @Get()
  findAll(@Query() query: UserQueryParams) {
    return this.usersService.findAll(query);
  }

  @Get(':id/activity')
  async getActivity(@Param('id', ParseIntPipe) id: number) {
    const activity = await this.usersService.getActivity(id);
    if (!activity) {
      throw new NotFoundException('User activity not found');
    }
    return activity;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(id, updateUserDto);
      return { message: 'User updated successfully' };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.usersService.remove(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}

```