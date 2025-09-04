import { Controller, Delete, Param, Req, HttpException, HttpStatus, Res, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Request, Response } from 'express';
import { CancelReservationDto } from './dto/cancel-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Delete(':id')
  async cancelReservation(
    @Param('id') reservationId: string,
    @Body() cancelReservationDto: CancelReservationDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = req.user['userId'];
      await this.reservationService.cancelReservation(reservationId, userId, cancelReservationDto.cancellationReason);
      return res.status(HttpStatus.OK).json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.getStatus()).json({ message: error.message });
      }
      console.error('Error cancelling reservation:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to cancel reservation' });
    }
  }
}