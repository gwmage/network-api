```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../src/modules/reservation/reservation.controller';
import { ReservationService } from '../src/modules/reservation/reservation.service';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

const mockReservationService = () => ({
  cancelReservation: jest.fn(),
});

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;
  let req: Request;
  let res: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useFactory: mockReservationService,
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
    req = { user: { userId: 1 } } as Request;
    res = {
      status: jest.fn().mockReturn(({
        json: jest.fn().mockReturn(null),
      })),
    } as unknown as Response;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('cancel', () => {
    it('should cancel a reservation', async () => {
      const reservationId = '1';
      const result = { message: 'Reservation cancelled' };
      jest.spyOn(service, 'cancelReservation').mockResolvedValue(result);

      await controller.cancelReservation(reservationId, req, res);

      expect(service.cancelReservation).toHaveBeenCalledWith(reservationId, 1);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.status().json).toHaveBeenCalledWith({ message: 'Reservation cancelled successfully', data: result });
    });

    it('should handle cancellations outside the allowed time window', async () => {
      const reservationId = '2';
      const errorMessage = 'Cancellation outside allowed time window';

      jest.spyOn(service, 'cancelReservation').mockRejectedValue(new HttpException(errorMessage, HttpStatus.BAD_REQUEST));

      await controller.cancelReservation(reservationId, req, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.status().json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it('should handle invalid reservation IDs', async () => {
      const reservationId = '3';
      const error = new NotFoundException();
      jest.spyOn(service, 'cancelReservation').mockRejectedValue(error);

      await controller.cancelReservation(reservationId, req, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(res.status().json).toHaveBeenCalledWith({ message: error.message });

    });

    it('should handle failed cancellations', async () => {
      const reservationId = '4';
      const error = new HttpException('Failed to cancel reservation', HttpStatus.INTERNAL_SERVER_ERROR);
      jest.spyOn(service, 'cancelReservation').mockRejectedValue(error);

      await controller.cancelReservation(reservationId, req, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(res.status().json).toHaveBeenCalledWith({ message: error.message });
    });



  });

});

```