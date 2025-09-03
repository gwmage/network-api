```typescript
import { Controller, Delete, Param, Req, HttpException, HttpStatus, Res } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Request, Response } from 'express';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Delete(':id')
  async cancelReservation(
    @Param('id') reservationId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = req.user['userId']; // Assuming userId is available in the request object
      await this.reservationService.cancelReservation(reservationId, userId);
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

```