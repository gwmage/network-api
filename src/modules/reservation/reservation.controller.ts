```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Request } from 'express';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto, @Req() req: Request) {
    try {
      return await this.reservationService.create(createReservationDto, req.user['id']);
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
}

```