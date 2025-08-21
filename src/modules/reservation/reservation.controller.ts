```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Sse } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Observable, interval, map } from 'rxjs';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      return await this.reservationService.create(createReservationDto);
    } catch (error) {
      throw new HttpException('Failed to create reservation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.reservationService.findAll();
    } catch (error) {
      throw new HttpException('Failed to retrieve reservations', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.reservationService.findOne(id);
    } catch (error) {
      throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    try {
      return await this.reservationService.update(id, updateReservationDto);
    } catch (error) {
      throw new HttpException('Failed to update reservation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.reservationService.remove(id);
      return { message: 'Reservation deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete reservation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Sse('notifications')
  notifications(): Observable<MessageEvent> {
    return interval(5000) // Adjust interval as needed
      .pipe(
        map(() => {
          const notifications = this.reservationService.getRecentNotifications(); // Implement this method in the service
          return { data: notifications };
        }),
      );
  }
}
```