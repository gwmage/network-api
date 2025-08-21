```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from '../src/reservation/reservation.controller';
import { ReservationService } from '../src/reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../src/reservation/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from '../src/reservation/dto/create-reservation.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateReservationDto } from '../src/reservation/dto/update-reservation.dto';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;
  let reservationRepository: Repository<Reservation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
    reservationRepository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a reservation', async () => {
      const createReservationDto: CreateReservationDto = { restaurantId: '1', userId: '1', dateTime: new Date() };
      const createdReservation: Reservation = { id: '1', ...createReservationDto };
      jest.spyOn(service, 'create').mockResolvedValue(createdReservation);

      const result = await controller.create(createReservationDto);

      expect(result).toEqual(createdReservation);
      expect(service.create).toHaveBeenCalledWith(createReservationDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of reservations', async () => {
      const result: Reservation[] = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a reservation', async () => {
      const id = '1';
      const reservation: Reservation = { id, restaurantId: '1', userId: '1', dateTime: new Date() };
      jest.spyOn(service, 'findOne').mockResolvedValue(reservation);

      expect(await controller.findOne(id)).toBe(reservation);
    });

    it('should throw NotFoundException if reservation not found', async () => {
      const id = 'non-existing-id';
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a reservation', async () => {
      const id = '1';
      const updateReservationDto: UpdateReservationDto = { dateTime: new Date() };
      const updatedReservation: Reservation = { id, restaurantId: '1', userId: '1', dateTime: new Date() };
      jest.spyOn(service, 'update').mockResolvedValue(updatedReservation);

      expect(await controller.update(id, updateReservationDto)).toBe(updatedReservation);
      expect(service.update).toHaveBeenCalledWith(id, updateReservationDto);

    });
  });

  describe('remove', () => {
    it('should remove a reservation', async () => {
      const id = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);

    });
  });
});

```