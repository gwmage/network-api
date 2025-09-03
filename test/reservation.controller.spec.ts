```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../src/modules/reservation/reservation.controller';
import { ReservationService } from '../src/modules/reservation/reservation.service';
import { NotFoundException } from '@nestjs/common';

const mockReservationService = () => ({
  cancelReservation: jest.fn(),
});

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('cancel', () => {
    it('should cancel a reservation', async () => {
      const reservationId = '1';
      const userId = 1;
      const cancellationReason = 'Test reason';
      jest.spyOn(service, 'cancelReservation').mockResolvedValue(undefined);

      expect(await controller.cancel(reservationId, userId, cancellationReason)).toBeUndefined();
      expect(service.cancelReservation).toHaveBeenCalledWith(reservationId, userId, cancellationReason);
    });

    it('should handle cancellations outside the allowed time window', async () => {
      const reservationId = '2';
      const userId = 1;
      const cancellationReason = 'Test reason';
      const errorMessage = 'Cancellation outside allowed time window';

      jest.spyOn(service, 'cancelReservation').mockRejectedValue(new Error(errorMessage));

      await expect(controller.cancel(reservationId, userId, cancellationReason)).rejects.toThrowError(errorMessage);
    });

    it('should handle invalid reservation IDs', async () => {
      const reservationId = '3';
      const userId = 1;
      const cancellationReason = 'Test reason';
      const error = new NotFoundException();
      jest.spyOn(service, 'cancelReservation').mockRejectedValue(error);

      await expect(controller.cancel(reservationId, userId, cancellationReason)).rejects.toThrowError(error);
    });

    it('should handle failed cancellations', async () => {
      const reservationId = '4';
      const userId = 1;
      const cancellationReason = 'Test reason';
      const error = new Error('Failed to cancel reservation');
      jest.spyOn(service, 'cancelReservation').mockRejectedValue(error);

      await expect(controller.cancel(reservationId, userId, cancellationReason)).rejects.toThrowError(error);
    });

    it('should call cancelReservation with cancellation reason', async () => {
      const reservationId = '5';
      const userId = 1;
      const cancellationReason = 'Another test reason';
      jest.spyOn(service, 'cancelReservation').mockResolvedValue(undefined);

      await controller.cancel(reservationId, userId, cancellationReason);

      expect(service.cancelReservation).toHaveBeenCalledWith(reservationId, userId, cancellationReason);
    });

    it('should call cancelReservation without cancellation reason', async () => {
      const reservationId = '6';
      const userId = 1;
      jest.spyOn(service, 'cancelReservation').mockResolvedValue(undefined);

      await controller.cancel(reservationId, userId);

      expect(service.cancelReservation).toHaveBeenCalledWith(reservationId, userId, undefined);
    });
  });
});

```