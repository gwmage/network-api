import { Controller, Param, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CancelReservationDto } from './dto/cancel-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Delete(':id/cancel')
  @UseGuards(JwtAuthGuard)
  async cancelReservation(
    @Param('id') id: number,
    @Body() cancelReservationDto: CancelReservationDto,
    @Req() req: Request
  ) {
    const userId = req.user.id;
    return this.reservationService.cancelReservation(userId, { reservationId: +id, ...cancelReservationDto });
  }

  // ... other controller methods
}