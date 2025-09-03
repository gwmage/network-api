```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from '../src/modules/reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../src/modules/reservation/reservation.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';


describe('ReservationService', () => {
  let service: ReservationService;
  let reservationRepository: Repository<Reservation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: {
            findOne: jest.fn(),
            softRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reservationRepository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('cancel', () => {
    it('should cancel a reservation', async () => {
      const reservationId = 1;
      const userId = 1;
      const mockReservation = { id: reservationId, userId };
      jest.spyOn(reservationRepository, 'findOne').mockResolvedValue(mockReservation);
      jest.spyOn(reservationRepository, 'softRemove').mockResolvedValue(mockReservation);


      const result = await service.cancel(reservationId, userId);

      expect(result).toEqual(mockReservation);
      expect(reservationRepository.findOne).toHaveBeenCalledWith({ where: { id: reservationId, userId } });
      expect(reservationRepository.softRemove).toHaveBeenCalledWith(mockReservation);

    });

    it('should throw NotFoundException if reservation does not exist', async () => {
      const reservationId = 1;
      const userId = 1;

      jest.spyOn(reservationRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.cancel(reservationId, userId)).rejects.toThrowError(NotFoundException);
    });

    it('should throw ForbiddenException if user is not the owner of the reservation', async () => {
      const reservationId = 1;
      const userId = 1;
      const mockReservation = { id: reservationId, userId: 2 }; // Different user ID
      jest.spyOn(reservationRepository, 'findOne').mockResolvedValue(mockReservation);


      await expect(service.cancel(reservationId, userId)).rejects.toThrowError(ForbiddenException);
    });
  });

});

```