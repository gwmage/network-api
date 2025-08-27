```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Request } from 'express';
import { RestaurantReservationService } from './restaurant-reservation.service';
import { CreateRestaurantReservationDto } from './dto/create-restaurant-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly restaurantReservationService: RestaurantReservationService,
  ) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto, @Req() req: Request) {
    try {
      return await this.reservationService.create(createReservationDto, req.user['id']);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto, @Req() req: Request) {
    try {
      return await this.reservationService.update(+id, updateReservationDto, req.user['id']);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    try {
      return await this.reservationService.remove(+id, req.user['id']);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('restaurant')
  async createRestaurantReservation(@Body() createRestaurantReservationDto: CreateRestaurantReservationDto, @Req() req: Request) {
    try {
      return await this.restaurantReservationService.create(createRestaurantReservationDto, req.user['id']);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.reservationService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('restaurant/:id')
  async findOneRestaurantReservation(@Param('id') id: string) {
    try {
      return await this.restaurantReservationService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('restaurant/search')
  async searchRestaurantReservations(@Query('query') query: string) {
    try {
      return await this.restaurantReservationService.search(query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

```